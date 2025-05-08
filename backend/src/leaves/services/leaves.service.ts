import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { Leave } from '../entities/leave.entity';
import { CreateLeaveDto, UpdateLeaveDto, ApproveLeaveDto } from '../dtos/leaves.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { User } from 'src/auth/entities/user.entity';
import { UserRole } from 'src/common/types/enums.type';
import { LeaveStatus } from 'src/common/types/enums.type';

/**
 * Service xử lý nghỉ phép
 */
@Injectable()
export class LeavesService {
  constructor(
    @InjectRepository(Leave)
    private readonly leaveRepository: Repository<Leave>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Tạo yêu cầu nghỉ phép mới
   * @param createLeaveDto Thông tin nghỉ phép
   * @param userId ID người dùng
   * @returns Thông tin yêu cầu nghỉ phép đã tạo
   */
  async create(createLeaveDto: CreateLeaveDto, userId: string) {
    // Kiểm tra quyền truy cập
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền tạo yêu cầu nghỉ phép');
    }

    // Kiểm tra nhân viên tồn tại
    const employee = await this.employeeRepository.findOne({
      where: { id: createLeaveDto.employeeId },
    });
    if (!employee) {
      throw new NotFoundException('Nhân viên không tồn tại');
    }

    // Kiểm tra số ngày nghỉ còn lại
    if (employee.remainingLeaveDays < createLeaveDto.days) {
      throw new BadRequestException('Số ngày nghỉ còn lại không đủ');
    }

    // Kiểm tra trùng lịch nghỉ
    const overlappingLeave = await this.leaveRepository.findOne({
      where: [
        {
          employeeId: createLeaveDto.employeeId,
          startDate: Between(createLeaveDto.startDate, createLeaveDto.endDate),
          status: LeaveStatus.APPROVED,
        },
        {
          employeeId: createLeaveDto.employeeId,
          endDate: Between(createLeaveDto.startDate, createLeaveDto.endDate),
          status: LeaveStatus.APPROVED,
        },
      ],
    });
    if (overlappingLeave) {
      throw new BadRequestException('Đã có yêu cầu nghỉ phép trong khoảng thời gian này');
    }

    // Tạo yêu cầu nghỉ phép mới
    const leave = this.leaveRepository.create(createLeaveDto);
    return await this.leaveRepository.save(leave);
  }

  /**
   * Lấy danh sách yêu cầu nghỉ phép
   * @param userId ID người dùng
   * @param query Tham số truy vấn
   * @returns Danh sách yêu cầu nghỉ phép
   */
  async findAll(userId: string, query: any) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    // Xây dựng điều kiện truy vấn
    const where: any = {
      isActive: true
    };
    
    // Nếu không phải admin, chỉ lấy yêu cầu nghỉ phép của nhân viên đó
    if (user.role !== UserRole.ADMIN) {
      const employee = await this.employeeRepository.findOne({
        where: { email: user.email },
      });
      if (!employee) {
        throw new NotFoundException('Không tìm thấy thông tin nhân viên');
      }
      where.employeeId = employee.id;
    }
    
    // Lọc theo khoảng thời gian
    if (query.startDate && query.endDate) {
      where.startDate = Between(new Date(query.startDate), new Date(query.endDate));
    }
    
    // Lọc theo trạng thái
    if (query.status) {
      where.status = query.status;
    }
    
    // Lọc theo loại nghỉ phép
    if (query.type) {
      where.type = query.type;
    }
    
    // Lọc theo tên nhân viên
    if (query.employeeName) {
      where.employee = {
        firstName: Like(`%${query.employeeName}%`),
      };
    }
    
    // Thực hiện truy vấn
    const leaves = await this.leaveRepository.find({
      where,
      relations: ['employee', 'approvedBy'],
      order: {
        createdAt: 'DESC',
      },
    });
    
    return leaves;
  }

  /**
   * Lấy thông tin yêu cầu nghỉ phép theo ID
   * @param id ID yêu cầu nghỉ phép
   * @param userId ID người dùng
   * @returns Thông tin yêu cầu nghỉ phép
   */
  async findOne(id: string, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    // Lấy thông tin yêu cầu nghỉ phép
    const leave = await this.leaveRepository.findOne({
      where: { id },
      relations: ['employee', 'approvedBy'],
    });
    
    if (!leave) {
      throw new NotFoundException('Không tìm thấy yêu cầu nghỉ phép');
    }
    
    // Kiểm tra quyền truy cập
    if (user.role !== UserRole.ADMIN) {
      const employee = await this.employeeRepository.findOne({
        where: { email: user.email },
      });
      if (!employee || employee.id !== leave.employeeId) {
        throw new BadRequestException('Bạn không có quyền xem yêu cầu nghỉ phép này');
      }
    }
    
    return leave;
  }

  /**
   * Cập nhật thông tin yêu cầu nghỉ phép
   * @param id ID yêu cầu nghỉ phép
   * @param updateLeaveDto Thông tin cập nhật
   * @param userId ID người dùng
   * @returns Thông tin yêu cầu nghỉ phép đã cập nhật
   */
  async update(id: string, updateLeaveDto: UpdateLeaveDto, userId: string) {
    // Kiểm tra quyền truy cập
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền cập nhật yêu cầu nghỉ phép');
    }
    
    // Kiểm tra yêu cầu nghỉ phép tồn tại
    const leave = await this.leaveRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    if (!leave) {
      throw new NotFoundException('Không tìm thấy yêu cầu nghỉ phép');
    }
    
    // Kiểm tra trạng thái
    if (leave.status !== LeaveStatus.PENDING) {
      throw new BadRequestException('Không thể cập nhật yêu cầu nghỉ phép đã được duyệt hoặc từ chối');
    }
    
    // Kiểm tra số ngày nghỉ còn lại nếu cập nhật số ngày
    if (updateLeaveDto.days && leave.employee.remainingLeaveDays < updateLeaveDto.days) {
      throw new BadRequestException('Số ngày nghỉ còn lại không đủ');
    }
    
    // Cập nhật thông tin
    Object.assign(leave, updateLeaveDto);
    return await this.leaveRepository.save(leave);
  }

  /**
   * Xóa yêu cầu nghỉ phép
   * @param id ID yêu cầu nghỉ phép
   * @param userId ID người dùng
   */
  async remove(id: string, userId: string) {
    // Kiểm tra quyền truy cập
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền xóa yêu cầu nghỉ phép');
    }
    
    // Kiểm tra yêu cầu nghỉ phép tồn tại
    const leave = await this.leaveRepository.findOne({
      where: { id },
    });
    if (!leave) {
      throw new NotFoundException('Không tìm thấy yêu cầu nghỉ phép');
    }
    
    // Kiểm tra trạng thái
    if (leave.status !== LeaveStatus.PENDING) {
      throw new BadRequestException('Không thể xóa yêu cầu nghỉ phép đã được duyệt hoặc từ chối');
    }
    
    // Sử dụng soft delete thay vì remove
    await this.leaveRepository.softDelete(id);
    
    // Cập nhật trường isActive
    await this.leaveRepository.update(id, { isActive: false });
  }

  /**
   * Duyệt yêu cầu nghỉ phép
   * @param id ID yêu cầu nghỉ phép
   * @param approveLeaveDto Thông tin duyệt
   * @param userId ID người dùng
   * @returns Thông tin yêu cầu nghỉ phép đã duyệt
   */
  async approve(id: string, approveLeaveDto: ApproveLeaveDto, userId: string) {
    // Kiểm tra quyền truy cập
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền duyệt yêu cầu nghỉ phép');
    }
    
    // Kiểm tra yêu cầu nghỉ phép tồn tại
    const leave = await this.leaveRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    if (!leave) {
      throw new NotFoundException('Không tìm thấy yêu cầu nghỉ phép');
    }
    
    // Kiểm tra trạng thái
    if (leave.status !== LeaveStatus.PENDING) {
      throw new BadRequestException('Yêu cầu nghỉ phép đã được duyệt hoặc từ chối');
    }
    
    // Cập nhật thông tin duyệt
    leave.status = approveLeaveDto.status;
    leave.approvedById = userId;
    leave.approvalDate = new Date();
    
    // Nếu duyệt, cập nhật số ngày nghỉ còn lại
    if (approveLeaveDto.status === LeaveStatus.APPROVED) {
      leave.employee.remainingLeaveDays -= leave.days;
      await this.employeeRepository.save(leave.employee);
    }
    
    return await this.leaveRepository.save(leave);
  }
} 