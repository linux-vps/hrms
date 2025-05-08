import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto, UpdateEmployeeDto, UpdateSalaryDto } from '../dtos/employee.dto';
import { Department } from 'src/departments/entities/department.entity';
import { PaginationDto, PaginatedResultDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/auth/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/common/types/enums.type';
import { SalaryHistory } from '../entities/salary-history.entity';

/**
 * Service xử lý nhân viên
 */
@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SalaryHistory)
    private readonly salaryHistoryRepository: Repository<SalaryHistory>,
  ) {}

  /**
   * Lấy danh sách nhân viên có phân trang
   * @param paginationDto Thông tin phân trang
   * @param search Từ khóa tìm kiếm
   * @returns Danh sách nhân viên đã phân trang
   */
  async findAll(paginationDto: PaginationDto, search?: string): Promise<PaginatedResultDto<Employee>> {
    // Tìm kiếm có filter theo tên hoặc email
    const whereClause = search
      ? [
          { firstName: ILike(`%${search}%`) },
          { lastName: ILike(`%${search}%`) },
          { email: ILike(`%${search}%`) },
        ]
      : {};
    
    const offset = paginationDto.offset();
    
    const [employees, totalItems] = await this.employeeRepository.findAndCount({
      where: whereClause,
      relations: ['department'],
      skip: offset,
      take: paginationDto.limit,
    });
    
    return new PaginatedResultDto<Employee>(
      employees,
      totalItems,
      paginationDto,
    );
  }

  /**
   * Lấy thông tin chi tiết nhân viên
   * @param id ID nhân viên
   * @returns Thông tin nhân viên
   */
  async findById(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['department'],
    });
    
    if (!employee) {
      throw new NotFoundException(`Không tìm thấy nhân viên với ID ${id}`);
    }
    
    return employee;
  }

  /**
   * Tạo nhân viên mới
   * @param createEmployeeDto Thông tin nhân viên mới
   * @param createAccount Có tạo tài khoản cho nhân viên hay không
   * @returns Nhân viên đã tạo
   */
  async create(createEmployeeDto: CreateEmployeeDto, createAccount: boolean = false): Promise<Employee> {
    const { email, departmentId, ...employeeData } = createEmployeeDto;
    
    // Kiểm tra email đã tồn tại chưa
    const existingEmployee = await this.employeeRepository.findOne({
      where: { email },
    });
    
    if (existingEmployee) {
      throw new BadRequestException(`Email ${email} đã được sử dụng`);
    }
    
    // Kiểm tra phòng ban nếu có
    if (departmentId) {
      const department = await this.departmentRepository.findOne({
        where: { id: departmentId },
      });
      
      if (!department) {
        throw new NotFoundException(`Không tìm thấy phòng ban với ID ${departmentId}`);
      }
    }
    
    // Tạo nhân viên mới
    const employee = this.employeeRepository.create({
      ...employeeData,
      email,
      departmentId,
    });
    
    const savedEmployee = await this.employeeRepository.save(employee);
    
    // Tạo tài khoản cho nhân viên nếu được yêu cầu
    if (createAccount && email) {
      // Tạo mật khẩu mặc định (email + họ và tên viết liền)
      const defaultPassword = `${email.split('@')[0]}${savedEmployee.firstName}${savedEmployee.lastName}`;
      await this.createUserAccountForEmployee(savedEmployee.id, email, defaultPassword);
    }
    
    return savedEmployee;
  }

  /**
   * Cập nhật thông tin nhân viên
   * @param id ID nhân viên
   * @param updateEmployeeDto Thông tin cập nhật
   * @returns Nhân viên đã cập nhật
   */
  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const { departmentId, ...updateData } = updateEmployeeDto;
  
    // Kiểm tra nhân viên tồn tại
    const employee = await this.findById(id);
  
    // Kiểm tra phòng ban nếu có
    if (departmentId) {
      const department = await this.departmentRepository.findOne({
        where: { id: departmentId },
      });
  
      if (!department) {
        throw new NotFoundException(`Không tìm thấy phòng ban với ID ${departmentId}`);
      }
    }
  
    // Chuyển đổi các trường của DTO sang kiểu phù hợp
    const updatedEmployee = {
      ...employee,
      ...updateData,
      departmentId: departmentId || employee.departmentId,
    };
  
    // Nếu có dateOfBirth và là string, chuyển đổi nó
    if (updateData.dateOfBirth && typeof updateData.dateOfBirth === 'string') {
      updatedEmployee.dateOfBirth = updateData.dateOfBirth;
    }
  
    // Nếu có hireDate và là string, chuyển đổi nó
    if (updateData.hireDate && typeof updateData.hireDate === 'string') {
      updatedEmployee.hireDate = new Date(updateData.hireDate);
    }
  
    // Chuyển đổi các giá trị số
    if (updateData.salary !== undefined) {
      updatedEmployee.salary = Number(updateData.salary);
    } 
  
    if (updateData.leaveDaysPerMonth !== undefined) {
      updatedEmployee.leaveDaysPerMonth = Number(updateData.leaveDaysPerMonth);
    }
  
    if (updateData.remainingLeaveDays !== undefined) {
      updatedEmployee.remainingLeaveDays = Number(updateData.remainingLeaveDays);
    }
  
    // Lưu thông tin cập nhật
    return this.employeeRepository.save(updatedEmployee);
  }
  

  /**
   * Cập nhật lương nhân viên và lưu lịch sử thay đổi
   * @param id ID nhân viên
   * @param salary Lương mới
   * @param reason Lý do thay đổi lương
   * @param userId ID người thực hiện
   * @returns Thông tin nhân viên đã cập nhật
   */
  async updateSalary(id: string, salary: number, reason: string, userId: string) {
    // Kiểm tra quyền truy cập
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền cập nhật lương nhân viên');
    }
    
    // Kiểm tra nhân viên tồn tại
    const employee = await this.employeeRepository.findOne({
      where: { id },
    });
    if (!employee) {
      throw new NotFoundException('Không tìm thấy nhân viên');
    }
    
    // Lưu lịch sử thay đổi lương
    const salaryHistory = this.salaryHistoryRepository.create({
      employeeId: id,
      previousSalary: employee.salary,
      newSalary: salary,
      effectiveDate: new Date(),
      reason,
      changedById: userId,
    });
    
    await this.salaryHistoryRepository.save(salaryHistory);
    
    // Cập nhật lương nhân viên
    employee.salary = salary;
    
    return await this.employeeRepository.save(employee);
  }

  /**
   * Lấy lịch sử thay đổi lương của nhân viên
   * @param id ID nhân viên
   * @returns Danh sách lịch sử thay đổi lương
   */
  async getSalaryHistory(id: string) {
    // Kiểm tra nhân viên tồn tại
    const employee = await this.employeeRepository.findOne({
      where: { id },
    });
    if (!employee) {
      throw new NotFoundException('Không tìm thấy nhân viên');
    }
    
    // Lấy lịch sử thay đổi lương
    const salaryHistory = await this.salaryHistoryRepository.find({
      where: { employeeId: id },
      relations: ['changedBy'],
      order: { effectiveDate: 'DESC' },
    });
    
    return salaryHistory;
  }

  /**
   * Xóa nhân viên
   * @param id ID nhân viên
   * @returns Kết quả xóa
   */
  async delete(id: string): Promise<{ id: string; success: boolean }> {
    // Kiểm tra nhân viên tồn tại
    const employee = await this.findById(id);
    
    // Xóa tài khoản liên kết (nếu có)
    const user = await this.userRepository.findOne({ where: { employeeId: id } });
    if (user) {
      await this.userRepository.remove(user);
    }
    
    // Thực hiện soft delete
    await this.employeeRepository.softDelete(id);
    
    return { id, success: true };
  }

  /**
   * Cập nhật ảnh đại diện
   * @param id ID nhân viên
   * @param avatar Đường dẫn file ảnh
   * @returns Nhân viên đã cập nhật
   */
  async updateAvatar(id: string, avatar: string): Promise<Employee> {
    // Kiểm tra nhân viên tồn tại
    const employee = await this.findById(id);
    
    // Cập nhật ảnh đại diện
    employee.avatar = avatar;
    
    return this.employeeRepository.save(employee);
  }

  /**
   * Tạo tài khoản cho nhân viên
   * @param employeeId ID nhân viên
   * @param email Email đăng nhập
   * @param password Mật khẩu
   * @param role Vai trò người dùng
   * @returns Thông tin người dùng đã tạo
   */
  async createUserAccountForEmployee(
    employeeId: string,
    email: string,
    password: string,
    role: UserRole = UserRole.EMPLOYEE
  ): Promise<User> {
    // Kiểm tra nhân viên tồn tại
    const employee = await this.findById(employeeId);
    
    // Kiểm tra đã có tài khoản cho nhân viên này chưa
    const existingUser = await this.userRepository.findOne({ where: { employeeId } });
    if (existingUser) {
      throw new BadRequestException(`Nhân viên đã có tài khoản`);
    }
    
    // Kiểm tra email đã được sử dụng cho tài khoản khác chưa
    const userWithEmail = await this.userRepository.findOne({ where: { email } });
    if (userWithEmail) {
      throw new BadRequestException(`Email ${email} đã được sử dụng cho tài khoản khác`);
    }
    
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Tạo người dùng mới
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      role,
      employeeId,
    });
    
    return this.userRepository.save(user);
  }
} 