import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * DTO tạo cấu hình mới
 */
export class CreatePayrollConfigDto {
  @ApiProperty({ description: 'Khóa cấu hình', example: 'social_insurance_rate' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ description: 'Giá trị cấu hình', example: '0.08' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({ description: 'Mô tả cấu hình', example: 'Tỷ lệ bảo hiểm xã hội', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

/**
 * DTO cập nhật cấu hình
 */
export class UpdatePayrollConfigDto {
  @ApiProperty({ description: 'Giá trị cấu hình', example: '0.08', required: false })
  @IsString()
  @IsOptional()
  value?: string;

  @ApiProperty({ description: 'Mô tả cấu hình', example: 'Tỷ lệ bảo hiểm xã hội', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

/**
 * DTO phản hồi thông tin cấu hình
 */
export class PayrollConfigResponseDto {
  @ApiProperty({ description: 'ID cấu hình' })
  id: string;

  @ApiProperty({ description: 'Khóa cấu hình' })
  key: string;

  @ApiProperty({ description: 'Giá trị cấu hình' })
  value: string;

  @ApiProperty({ description: 'Mô tả cấu hình' })
  description: string;

  @ApiProperty({ description: 'Trạng thái hoạt động' })
  isActive: boolean;

  @ApiProperty({ description: 'Thời gian tạo' })
  createdAt: Date;

  @ApiProperty({ description: 'Thời gian cập nhật' })
  updatedAt: Date;
} 