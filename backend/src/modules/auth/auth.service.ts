import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { EmployeeResponse } from '../employee/interfaces/employee-response.interface';
import { Role } from '../../common/enums/role.enum';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';
import { MailService } from '../mail/mail.service';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private jwtService: JwtService,
    private mailService: MailService,
    private otpService: OtpService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { password, ...rest } = registerDto;
    
    // Check if email already exists
    const existingEmployee = await this.employeeRepository.findOne({
      where: { email: registerDto.email },
    });
    
    if (existingEmployee) {
      throw new UnauthorizedException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new employee
    const employee = this.employeeRepository.create({
      ...rest,
      password: hashedPassword,
      role: registerDto.role || Role.USER,
    });

    await this.employeeRepository.save(employee);

    // Gửi email thông báo tài khoản mới
    await this.mailService.sendNewAccountEmail(
      employee.email,
      employee.fullName || 'Người dùng',
      password // Gửi mật khẩu gốc (chưa hash)
    );

    const { password: _, ...result } = employee;
    return result;
  }

  async validateEmployee(email: string, password: string): Promise<EmployeeResponse> {
    const employee = await this.employeeRepository.findOne({
      where: { email },
    });

    if (!employee) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = employee;
    return {
      ...result,
      role: employee.role,
      departmentId: employee.departmentId,
    };
  }

  async login(employee: EmployeeResponse) {
    const payload: JwtPayload = {
      sub: employee.id,
      role: employee.role,
      departmentId: employee.departmentId,
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      employee,
    };
  }

  async requestPasswordReset(email: string): Promise<{ message: string }> {
    const employee = await this.employeeRepository.findOne({
      where: { email },
    });

    if (!employee) {
      throw new NotFoundException('Email không tồn tại trong hệ thống');
    }

    // Tạo và gửi OTP qua email
    await this.otpService.createOtp(
      employee.id,
      email,
      employee.fullName || 'Người dùng'
    );

    return { message: 'Mã OTP đã được gửi đến email của bạn' };
  }

  async verifyOtpAndResetPassword(email: string, otp: string): Promise<{ message: string }> {
    const employee = await this.employeeRepository.findOne({
      where: { email },
    });

    if (!employee) {
      throw new NotFoundException('Email không tồn tại trong hệ thống');
    }

    // Xác thực OTP
    const isValid = await this.otpService.verifyOtp(employee.id, otp);
    if (!isValid) {
      throw new BadRequestException('Mã OTP không hợp lệ hoặc đã hết hạn');
    }

    // Tạo mật khẩu mới ngẫu nhiên
    const newPassword = this.generateRandomPassword();
    
    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Cập nhật mật khẩu trong CSDL
    employee.password = hashedPassword;
    await this.employeeRepository.save(employee);

    // Gửi email mật khẩu mới
    await this.mailService.sendPasswordResetEmail(
      email,
      employee.fullName || 'Người dùng',
      newPassword
    );

    return { message: 'Mật khẩu mới đã được gửi đến email của bạn' };
  }

  async changePassword(employeeId: string, currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException('Nhân viên không tồn tại');
    }

    // Kiểm tra mật khẩu hiện tại
    const isPasswordValid = await bcrypt.compare(currentPassword, employee.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Mật khẩu hiện tại không chính xác');
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Cập nhật mật khẩu
    employee.password = hashedPassword;
    await this.employeeRepository.save(employee);

    return { message: 'Đổi mật khẩu thành công' };
  }

  async impersonateManager(managerEmail: string) {
    // Tìm quản lý theo email
    const manager = await this.employeeRepository.findOne({
      where: { email: managerEmail },
    });

    if (!manager) {
      throw new NotFoundException('Không tìm thấy quản lý với email này');
    }

    // Kiểm tra xem người này có phải là quản lý không
    if (manager.role !== Role.MANAGER) {
      throw new BadRequestException('Tài khoản này không phải là quản lý');
    }

    // Tạo đối tượng employee response
    const employeeResponse: EmployeeResponse = {
      id: manager.id,
      fullName: manager.fullName,
      email: manager.email,
      role: manager.role,
      departmentId: manager.departmentId,
    };

    // Đăng nhập với quyền của quản lý
    return this.login(employeeResponse);
  }

  private generateRandomPassword(length = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return password;
  }
}