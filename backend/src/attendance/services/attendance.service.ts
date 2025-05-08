import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { Attendance } from '../entities/attendance.entity';
import { CreateAttendanceDto, UpdateAttendanceDto } from '../dtos/attendance.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { User } from 'src/auth/entities/user.entity';
import { UserRole } from 'src/common/types/enums.type';
import { AttendanceStatus } from 'src/common/types/enums.type';
import { WorkShift } from '../entities/work-shift.entity';

/**
 * Service xử lý chấm công
 */
@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(WorkShift)
    private readonly workShiftRepository: Repository<WorkShift>,
  ) {}

  /**
   * Tạo bản ghi chấm công mới
   * @param createAttendanceDto Thông tin chấm công
   * @param userId ID người dùng thực hiện
   * @returns Bản ghi chấm công đã tạo
   */
  async create(createAttendanceDto: CreateAttendanceDto, userId: string): Promise<Attendance> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền tạo bản ghi chấm công');
    }
    
    const employee = await this.employeeRepository.findOne({
      where: { id: createAttendanceDto.employeeId },
    });
    
    if (!employee) {
      throw new NotFoundException('Nhân viên không tồn tại');
    }
    
    const existingAttendance = await this.attendanceRepository.findOne({
      where: {
        employeeId: createAttendanceDto.employeeId,
        date: createAttendanceDto.date,
      },
    });
    
    if (existingAttendance) {
      throw new BadRequestException('Nhân viên đã được chấm công trong ngày này');
    }
    
    if (createAttendanceDto.workShiftId) {
      const workShift = await this.workShiftRepository.findOne({
        where: { id: createAttendanceDto.workShiftId },
      });
      
      if (!workShift) {
        throw new NotFoundException('Ca làm việc không tồn tại');
      }
      
      // Kiểm tra và đánh dấu đi muộn/về sớm nếu có cung cấp thời gian check-in/out
      if (createAttendanceDto.checkInTime && !createAttendanceDto.isLate) {
        createAttendanceDto.isLate = this.isLate(createAttendanceDto.checkInTime, workShift.startTime);
      }
      
      if (createAttendanceDto.checkOutTime && !createAttendanceDto.isEarlyLeave) {
        createAttendanceDto.isEarlyLeave = this.isEarlyLeave(createAttendanceDto.checkOutTime, workShift.endTime);
      }
    }
    
    const attendance = this.attendanceRepository.create(createAttendanceDto);
    return await this.attendanceRepository.save(attendance);
  }

  /**
   * Lấy danh sách bản ghi chấm công
   * @param userId ID người dùng
   * @param query Tham số truy vấn
   * @returns Danh sách bản ghi chấm công
   */
  async findAll(userId: string, query: any): Promise<Attendance[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    let queryBuilder = this.attendanceRepository.createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.employee', 'employee')
      .leftJoinAndSelect('attendance.workShift', 'workShift')
      .where('attendance.isActive = :isActive', { isActive: true });
    
    // Nếu là nhân viên, chỉ lấy bản ghi chấm công của chính mình
    if (user.role === UserRole.EMPLOYEE) {
      const employee = await this.employeeRepository.findOne({
        where: { email: user.email },
      });
      
      if (!employee) {
        throw new NotFoundException('Không tìm thấy thông tin nhân viên');
      }
      
      queryBuilder = queryBuilder.andWhere('attendance.employeeId = :employeeId', { employeeId: employee.id });
    } 
    // Nếu là admin và có lọc theo nhân viên cụ thể
    else if (query.employeeId) {
      queryBuilder = queryBuilder.andWhere('attendance.employeeId = :employeeId', { employeeId: query.employeeId });
    }
    
    // Lọc theo khoảng thời gian
    if (query.startDate && query.endDate) {
      queryBuilder = queryBuilder.andWhere('attendance.date BETWEEN :startDate AND :endDate', {
        startDate: query.startDate,
        endDate: query.endDate,
      });
    } else if (query.startDate) {
      queryBuilder = queryBuilder.andWhere('attendance.date >= :startDate', { startDate: query.startDate });
    } else if (query.endDate) {
      queryBuilder = queryBuilder.andWhere('attendance.date <= :endDate', { endDate: query.endDate });
    }
    
    // Lọc theo ca làm việc
    if (query.workShiftId) {
      queryBuilder = queryBuilder.andWhere('attendance.workShiftId = :workShiftId', { workShiftId: query.workShiftId });
    }
    
    // Lọc theo trạng thái
    if (query.status) {
      queryBuilder = queryBuilder.andWhere('attendance.status = :status', { status: query.status });
    }
    
    // Lọc theo đi muộn hoặc về sớm
    if (query.isLate === 'true') {
      queryBuilder = queryBuilder.andWhere('attendance.isLate = true');
    }
    
    if (query.isEarlyLeave === 'true') {
      queryBuilder = queryBuilder.andWhere('attendance.isEarlyLeave = true');
    }
    
    return queryBuilder.orderBy('attendance.date', 'DESC').getMany();
  }

  /**
   * Lấy thông tin bản ghi chấm công theo ID
   * @param id ID bản ghi chấm công
   * @param userId ID người dùng thực hiện
   * @returns Thông tin bản ghi chấm công
   */
  async findOne(id: string, userId: string): Promise<Attendance> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    const attendance = await this.attendanceRepository.findOne({
      where: { id },
      relations: ['employee', 'workShift'],
    });
    
    if (!attendance) {
      throw new NotFoundException('Không tìm thấy bản ghi chấm công');
    }
    
    if (user.role === UserRole.EMPLOYEE) {
      const employee = await this.employeeRepository.findOne({
        where: { email: user.email },
      });
      
      if (!employee || employee.id !== attendance.employeeId) {
        throw new BadRequestException('Bạn không có quyền xem bản ghi chấm công này');
      }
    }
    
    return attendance;
  }

  /**
   * Cập nhật bản ghi chấm công
   * @param id ID bản ghi chấm công
   * @param updateAttendanceDto Thông tin cần cập nhật
   * @param userId ID người dùng thực hiện
   * @returns Bản ghi chấm công đã cập nhật
   */
  async update(id: string, updateAttendanceDto: UpdateAttendanceDto, userId: string): Promise<Attendance> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền cập nhật bản ghi chấm công');
    }
    
    const attendance = await this.findOne(id, userId);
    
    if (updateAttendanceDto.workShiftId) {
      const workShift = await this.workShiftRepository.findOne({
        where: { id: updateAttendanceDto.workShiftId },
      });
      
      if (!workShift) {
        throw new NotFoundException('Ca làm việc không tồn tại');
      }
      
      // Cập nhật trạng thái đi muộn/về sớm dựa trên check-in/out time mới
      if (updateAttendanceDto.checkInTime) {
        updateAttendanceDto.isLate = this.isLate(
          updateAttendanceDto.checkInTime, 
          workShift.startTime
        );
      } else if (attendance.checkInTime && attendance.workShiftId !== updateAttendanceDto.workShiftId) {
        updateAttendanceDto.isLate = this.isLate(
          attendance.checkInTime, 
          workShift.startTime
        );
      }
      
      if (updateAttendanceDto.checkOutTime) {
        updateAttendanceDto.isEarlyLeave = this.isEarlyLeave(
          updateAttendanceDto.checkOutTime, 
          workShift.endTime
        );
      } else if (attendance.checkOutTime && attendance.workShiftId !== updateAttendanceDto.workShiftId) {
        updateAttendanceDto.isEarlyLeave = this.isEarlyLeave(
          attendance.checkOutTime, 
          workShift.endTime
        );
      }
    }
    
    // Merge và lưu trữ
    const updatedAttendance = { ...attendance, ...updateAttendanceDto };
    return this.attendanceRepository.save(updatedAttendance);
  }

  /**
   * Xóa bản ghi chấm công
   * @param id ID bản ghi chấm công
   * @param userId ID người dùng thực hiện
   */
  async remove(id: string, userId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền xóa bản ghi chấm công');
    }
    
    const attendance = await this.findOne(id, userId);
    
    // Sử dụng soft delete thay vì remove
    await this.attendanceRepository.softDelete(id);
    
    // Cập nhật trường isActive
    await this.attendanceRepository.update(id, { isActive: false });
  }

  /**
   * Chấm công hàng ngày (check-in)
   * @param userId ID người dùng thực hiện
   * @returns Bản ghi chấm công đã tạo
   */
  async checkIn(userId: string): Promise<Attendance> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    const employee = await this.employeeRepository.findOne({
      where: { email: user.email },
    });
    
    if (!employee) {
      throw new NotFoundException('Không tìm thấy thông tin nhân viên');
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingAttendance = await this.attendanceRepository.findOne({
      where: {
        employeeId: employee.id,
        date: today,
      },
    });
    
    if (existingAttendance) {
      throw new BadRequestException('Bạn đã chấm công trong ngày hôm nay');
    }
    
    // Lấy thời gian hiện tại định dạng HH:MM
    const now = new Date();
    const checkInTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Tạo mới bản ghi chấm công
    const attendance = this.attendanceRepository.create({
      employeeId: employee.id,
      date: today,
      status: AttendanceStatus.PRESENT,
      checkInTime,
    });
    
    return await this.attendanceRepository.save(attendance);
  }

  /**
   * Cập nhật thời gian check-out
   * @param userId ID người dùng thực hiện
   * @returns Bản ghi chấm công đã cập nhật
   */
  async checkOut(userId: string): Promise<Attendance> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    const employee = await this.employeeRepository.findOne({
      where: { email: user.email },
    });
    
    if (!employee) {
      throw new NotFoundException('Không tìm thấy thông tin nhân viên');
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const attendance = await this.attendanceRepository.findOne({
      where: {
        employeeId: employee.id,
        date: today,
      },
      relations: ['workShift'],
    });
    
    if (!attendance) {
      throw new BadRequestException('Bạn chưa check-in trong ngày hôm nay');
    }
    
    if (attendance.checkOutTime) {
      throw new BadRequestException('Bạn đã check-out trước đó');
    }
    
    // Lấy thời gian hiện tại định dạng HH:MM
    const now = new Date();
    const checkOutTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // Kiểm tra nếu có ca làm việc, xác định có về sớm hay không
    if (attendance.workShift) {
      attendance.isEarlyLeave = this.isEarlyLeave(checkOutTime, attendance.workShift.endTime);
    }
    
    attendance.checkOutTime = checkOutTime;
    
    return await this.attendanceRepository.save(attendance);
  }

  /**
   * Xác định người dùng đi muộn dựa trên thời gian check-in và thời gian bắt đầu ca
   * @param checkInTime Thời gian check-in
   * @param shiftStartTime Thời gian bắt đầu ca
   * @returns true nếu đi muộn
   */
  private isLate(checkInTime: string, shiftStartTime: string): boolean {
    // Chuyển chuỗi thời gian sang phút để so sánh
    const [checkInHour, checkInMinute] = checkInTime.split(':').map(Number);
    const [startHour, startMinute] = shiftStartTime.split(':').map(Number);
    
    const checkInMinutes = checkInHour * 60 + checkInMinute;
    const startMinutes = startHour * 60 + startMinute;
    
    // Nếu thời gian check-in lớn hơn thời gian bắt đầu => đi muộn
    return checkInMinutes > startMinutes;
  }

  /**
   * Xác định người dùng về sớm dựa trên thời gian check-out và thời gian kết thúc ca
   * @param checkOutTime Thời gian check-out
   * @param shiftEndTime Thời gian kết thúc ca
   * @returns true nếu về sớm
   */
  private isEarlyLeave(checkOutTime: string, shiftEndTime: string): boolean {
    // Chuyển chuỗi thời gian sang phút để so sánh
    const [checkOutHour, checkOutMinute] = checkOutTime.split(':').map(Number);
    const [endHour, endMinute] = shiftEndTime.split(':').map(Number);
    
    const checkOutMinutes = checkOutHour * 60 + checkOutMinute;
    const endMinutes = endHour * 60 + endMinute;
    
    // Nếu thời gian check-out nhỏ hơn thời gian kết thúc => về sớm
    return checkOutMinutes < endMinutes;
  }
} 