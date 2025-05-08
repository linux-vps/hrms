import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkShift } from '../entities/work-shift.entity';
import { CreateWorkShiftDto, UpdateWorkShiftDto } from '../dtos/work-shift.dto';

/**
 * Service xử lý ca làm việc
 */
@Injectable()
export class WorkShiftService {
  constructor(
    @InjectRepository(WorkShift)
    private readonly workShiftRepository: Repository<WorkShift>,
  ) {}

  /**
   * Tạo ca làm việc mới
   * @param createWorkShiftDto Thông tin ca làm việc
   * @returns Ca làm việc đã tạo
   */
  async create(createWorkShiftDto: CreateWorkShiftDto): Promise<WorkShift> {
    const workShift = this.workShiftRepository.create(createWorkShiftDto);
    return this.workShiftRepository.save(workShift);
  }

  /**
   * Lấy tất cả ca làm việc
   * @param active Trạng thái hoạt động
   * @returns Danh sách ca làm việc
   */
  async findAll(active?: boolean): Promise<WorkShift[]> {
    const queryBuilder = this.workShiftRepository.createQueryBuilder('workShift');
    
    if (active !== undefined) {
      queryBuilder.where('workShift.active = :active', { active });
      queryBuilder.andWhere('workShift.isActive = :isActive', { isActive: true });
    } else {
      queryBuilder.where('workShift.isActive = :isActive', { isActive: true });
    }
    
    return queryBuilder.orderBy('workShift.createdAt', 'DESC').getMany();
  }

  /**
   * Lấy ca làm việc theo ID
   * @param id ID ca làm việc
   * @returns Ca làm việc
   */
  async findOne(id: string): Promise<WorkShift> {
    const workShift = await this.workShiftRepository.findOne({ where: { id } });
    
    if (!workShift) {
      throw new NotFoundException('Không tìm thấy ca làm việc');
    }
    
    return workShift;
  }

  /**
   * Cập nhật ca làm việc
   * @param id ID ca làm việc
   * @param updateWorkShiftDto Thông tin cần cập nhật
   * @returns Ca làm việc đã cập nhật
   */
  async update(id: string, updateWorkShiftDto: UpdateWorkShiftDto): Promise<WorkShift> {
    const workShift = await this.findOne(id);
    
    this.workShiftRepository.merge(workShift, updateWorkShiftDto);
    return this.workShiftRepository.save(workShift);
  }

  /**
   * Xóa ca làm việc
   * @param id ID ca làm việc
   * @returns Thông báo kết quả
   */
  async remove(id: string): Promise<{ success: boolean; message: string }> {
    await this.findOne(id);
    
    // Sử dụng soft delete thay vì remove
    await this.workShiftRepository.softDelete(id);
    
    // Cập nhật trường isActive
    await this.workShiftRepository.update(id, { isActive: false });
    
    return { 
      success: true, 
      message: 'Xóa ca làm việc thành công' 
    };
  }
} 