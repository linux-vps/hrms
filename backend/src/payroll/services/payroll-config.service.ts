import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PayrollConfig } from '../entities/payroll-config.entity';
import { CreatePayrollConfigDto, UpdatePayrollConfigDto } from '../dtos';

/**
 * Service quản lý cấu hình tính lương
 */
@Injectable()
export class PayrollConfigService {
  constructor(
    @InjectRepository(PayrollConfig)
    private readonly payrollConfigRepository: Repository<PayrollConfig>,
  ) {}

  /**
   * Tạo cấu hình mới
   * @param createPayrollConfigDto Thông tin cấu hình
   * @returns Cấu hình đã tạo
   */
  async create(createPayrollConfigDto: CreatePayrollConfigDto): Promise<PayrollConfig> {
    const config = this.payrollConfigRepository.create(createPayrollConfigDto);
    return await this.payrollConfigRepository.save(config);
  }

  /**
   * Lấy danh sách cấu hình
   * @returns Danh sách cấu hình
   */
  async findAll(): Promise<PayrollConfig[]> {
    return await this.payrollConfigRepository.find({
      where: { isActive: true },
      order: { key: 'ASC' }
    });
  }

  /**
   * Lấy cấu hình theo ID
   * @param id ID cấu hình
   * @returns Thông tin cấu hình
   */
  async findOne(id: string): Promise<PayrollConfig> {
    const config = await this.payrollConfigRepository.findOne({
      where: { id, isActive: true }
    });
    
    if (!config) {
      throw new NotFoundException('Không tìm thấy cấu hình');
    }
    
    return config;
  }

  /**
   * Lấy cấu hình theo khóa
   * @param key Khóa cấu hình
   * @returns Thông tin cấu hình
   */
  async findByKey(key: string): Promise<PayrollConfig> {
    const config = await this.payrollConfigRepository.findOne({
      where: { key, isActive: true }
    });
    
    if (!config) {
      throw new NotFoundException(`Không tìm thấy cấu hình với khóa: ${key}`);
    }
    
    return config;
  }

  /**
   * Lấy giá trị cấu hình theo khóa
   * @param key Khóa cấu hình
   * @param defaultValue Giá trị mặc định nếu không tìm thấy
   * @returns Giá trị cấu hình
   */
  async getValueByKey(key: string, defaultValue?: string): Promise<string> {
    try {
      const config = await this.findByKey(key);
      return config.value;
    } catch (error) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw error;
    }
  }

  /**
   * Lấy giá trị số từ cấu hình theo khóa
   * @param key Khóa cấu hình
   * @param defaultValue Giá trị mặc định nếu không tìm thấy
   * @returns Giá trị số
   */
  async getNumberValueByKey(key: string, defaultValue?: number): Promise<number> {
    try {
      const value = await this.getValueByKey(key);
      return parseFloat(value);
    } catch (error) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw error;
    }
  }

  /**
   * Cập nhật cấu hình
   * @param id ID cấu hình
   * @param updatePayrollConfigDto Thông tin cập nhật
   * @returns Cấu hình đã cập nhật
   */
  async update(id: string, updatePayrollConfigDto: UpdatePayrollConfigDto): Promise<PayrollConfig> {
    const config = await this.findOne(id);
    
    Object.assign(config, updatePayrollConfigDto);
    
    return await this.payrollConfigRepository.save(config);
  }

  /**
   * Xóa cấu hình
   * @param id ID cấu hình
   */
  async remove(id: string): Promise<void> {
    const config = await this.findOne(id);
    
    // Sử dụng soft delete thay vì xóa hoàn toàn
    await this.payrollConfigRepository.softDelete(id);
    
    // Cập nhật trường isActive
    await this.payrollConfigRepository.update(id, { isActive: false });
  }

  /**
   * Khởi tạo dữ liệu mặc định cho cấu hình
   */
  async initDefaultConfigs(): Promise<void> {
    const defaults = [
      {
        key: 'social_insurance_rate',
        value: '0.08',
        description: 'Tỷ lệ bảo hiểm xã hội (8%)',
      },
      {
        key: 'health_insurance_rate',
        value: '0.015',
        description: 'Tỷ lệ bảo hiểm y tế (1.5%)',
      },
      {
        key: 'unemployment_insurance_rate',
        value: '0.01',
        description: 'Tỷ lệ bảo hiểm thất nghiệp (1%)',
      },
      {
        key: 'personal_deduction',
        value: '11000000',
        description: 'Giảm trừ gia cảnh cá nhân (11 triệu VNĐ)',
      },
      {
        key: 'dependent_deduction',
        value: '4400000',
        description: 'Giảm trừ gia cảnh người phụ thuộc (4.4 triệu VNĐ/người)',
      },
      {
        key: 'attendance_bonus_rate',
        value: '0.1',
        description: 'Tỷ lệ thưởng chuyên cần (10% lương cơ bản)',
      },
    ];

    for (const config of defaults) {
      // Kiểm tra xem đã tồn tại chưa
      const existingConfig = await this.payrollConfigRepository.findOne({
        where: { key: config.key }
      });
      
      if (!existingConfig) {
        await this.create(config as CreatePayrollConfigDto);
      }
    }
  }
} 