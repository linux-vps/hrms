import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { ActivityLog } from '../entities/activity-log.entity';
import { User } from 'src/auth/entities/user.entity';
import { UserRole } from 'src/common/types/enums.type';

/**
 * Service xử lý nhật ký hoạt động
 */
@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private readonly activityLogRepository: Repository<ActivityLog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Tạo nhật ký hoạt động mới
   * @param data Thông tin nhật ký
   * @returns Thông tin nhật ký đã tạo
   */
  async create(data: Partial<ActivityLog>) {
    const activityLog = this.activityLogRepository.create(data);
    return await this.activityLogRepository.save(activityLog);
  }

  /**
   * Lấy danh sách nhật ký hoạt động
   * @param userId ID người dùng yêu cầu
   * @param query Tham số truy vấn
   * @returns Danh sách nhật ký hoạt động
   */
  async findAll(userId: string, query: any) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    // Kiểm tra quyền truy cập, chỉ admin mới có thể xem tất cả nhật ký
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền xem nhật ký hoạt động');
    }
    
    // Xây dựng điều kiện truy vấn
    const where: any = {
      // Mặc định chỉ lấy bản ghi còn hoạt động
      isActive: true
    };
    
    // Lọc theo người dùng
    if (query.userId) {
      where.userId = query.userId;
    }
    
    // Lọc theo hành động
    if (query.action) {
      where.action = Like(`%${query.action}%`);
    }
    
    // Lọc theo loại thực thể
    if (query.entityType) {
      where.entityType = query.entityType;
    }
    
    // Lọc theo ID thực thể
    if (query.entityId) {
      where.entityId = query.entityId;
    }
    
    // Lọc theo khoảng thời gian
    if (query.fromDate && query.toDate) {
      where.timestamp = Between(new Date(query.fromDate), new Date(query.toDate));
    }
    
    // Thực hiện truy vấn
    const activityLogs = await this.activityLogRepository.find({
      where,
      relations: ['user'],
      order: {
        timestamp: 'DESC',
      },
    });
    
    return activityLogs;
  }

  /**
   * Lấy danh sách nhật ký hoạt động của người dùng cụ thể
   * @param targetUserId ID người dùng cần xem nhật ký
   * @param userId ID người dùng yêu cầu
   * @param query Tham số truy vấn
   * @returns Danh sách nhật ký hoạt động
   */
  async findByUser(targetUserId: string, userId: string, query: any) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    // Kiểm tra quyền truy cập
    if (user.role !== UserRole.ADMIN && userId !== targetUserId) {
      throw new BadRequestException('Bạn không có quyền xem nhật ký hoạt động người khác');
    }
    
    // Kiểm tra người dùng cần xem nhật ký tồn tại
    const targetUser = await this.userRepository.findOne({
      where: { id: targetUserId },
    });
    if (!targetUser) {
      throw new NotFoundException('Không tìm thấy người dùng cần xem nhật ký');
    }
    
    // Xây dựng điều kiện truy vấn
    const where: any = {
      userId: targetUserId,
      isActive: true
    };
    
    // Lọc theo hành động
    if (query.action) {
      where.action = Like(`%${query.action}%`);
    }
    
    // Lọc theo loại thực thể
    if (query.entityType) {
      where.entityType = query.entityType;
    }
    
    // Lọc theo khoảng thời gian
    if (query.fromDate && query.toDate) {
      where.timestamp = Between(new Date(query.fromDate), new Date(query.toDate));
    }
    
    // Thực hiện truy vấn
    const activityLogs = await this.activityLogRepository.find({
      where,
      relations: ['user'],
      order: {
        timestamp: 'DESC',
      },
    });
    
    return activityLogs;
  }

  /**
   * Xóa nhật ký hoạt động cũ
   * @param days Số ngày giữ lại
   * @param userId ID người dùng
   * @returns Số lượng bản ghi đã xóa
   */
  async deleteOldLogs(days: number, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    // Kiểm tra quyền truy cập
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền xóa nhật ký hoạt động');
    }
    
    // Tính toán ngày giới hạn
    const date = new Date();
    date.setDate(date.getDate() - days);
    
    // Lấy danh sách các bản ghi cần xóa
    const oldLogs = await this.activityLogRepository.find({
      where: {
        timestamp: Between(new Date(0), date),
      },
    });
    
    // Thực hiện soft delete
    const result = await this.activityLogRepository.softDelete({
      timestamp: Between(new Date(0), date),
    });
    
    // Cập nhật trường isActive cho tất cả các bản ghi đã xóa
    for (const log of oldLogs) {
      await this.activityLogRepository.update(log.id, { isActive: false });
    }
    
    return result.affected || 0;
  }
} 