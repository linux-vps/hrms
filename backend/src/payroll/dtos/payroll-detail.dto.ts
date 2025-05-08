import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

/**
 * DTO cơ bản cho các hoạt động với phụ cấp
 */
export class AllowanceDto {
  @ApiProperty({ description: 'Tên phụ cấp', example: 'Phụ cấp xăng xe' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Số tiền phụ cấp', example: 500000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Mô tả phụ cấp', example: 'Phụ cấp đi lại hàng tháng', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Có tính thuế hay không', example: true, default: true, required: false })
  @IsBoolean()
  @IsOptional()
  taxable?: boolean;
}

/**
 * DTO thêm phụ cấp mới
 */
export class CreateAllowanceDto extends AllowanceDto {}

/**
 * DTO cập nhật thông tin phụ cấp
 */
export class UpdateAllowanceDto {
  @ApiProperty({ description: 'Tên phụ cấp', example: 'Phụ cấp xăng xe', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Số tiền phụ cấp', example: 500000, required: false })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({ description: 'Mô tả phụ cấp', example: 'Phụ cấp đi lại hàng tháng', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Có tính thuế hay không', example: true, required: false })
  @IsBoolean()
  @IsOptional()
  taxable?: boolean;
}

/**
 * DTO phản hồi thông tin phụ cấp
 */
export class AllowanceResponseDto {
  @ApiProperty({ description: 'ID phụ cấp' })
  id: string;

  @ApiProperty({ description: 'ID bảng lương' })
  payrollId: string;

  @ApiProperty({ description: 'Tên phụ cấp', example: 'Phụ cấp xăng xe' })
  name: string;

  @ApiProperty({ description: 'Số tiền phụ cấp', example: 500000 })
  amount: number;

  @ApiProperty({ description: 'Mô tả phụ cấp', example: 'Phụ cấp đi lại hàng tháng', required: false })
  description?: string;

  @ApiProperty({ description: 'Có tính thuế hay không', example: true })
  taxable: boolean;

  @ApiProperty({ description: 'Còn hoạt động', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Thời gian tạo' })
  createdAt: Date;

  @ApiProperty({ description: 'Thời gian cập nhật' })
  updatedAt: Date;
}

/**
 * DTO cơ bản cho các hoạt động với thưởng
 */
export class BonusDto {
  @ApiProperty({ description: 'Tên thưởng', example: 'Thưởng dự án' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Số tiền thưởng', example: 1000000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Mô tả thưởng', example: 'Thưởng hoàn thành dự án ABC', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Có tính thuế hay không', example: true, default: true, required: false })
  @IsBoolean()
  @IsOptional()
  taxable?: boolean;
}

/**
 * DTO thêm thưởng mới
 */
export class CreateBonusDto extends BonusDto {}

/**
 * DTO cập nhật thông tin thưởng
 */
export class UpdateBonusDto {
  @ApiProperty({ description: 'Tên thưởng', example: 'Thưởng dự án', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Số tiền thưởng', example: 1000000, required: false })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({ description: 'Mô tả thưởng', example: 'Thưởng hoàn thành dự án ABC', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Có tính thuế hay không', example: true, required: false })
  @IsBoolean()
  @IsOptional()
  taxable?: boolean;
}

/**
 * DTO phản hồi thông tin thưởng
 */
export class BonusResponseDto {
  @ApiProperty({ description: 'ID thưởng' })
  id: string;

  @ApiProperty({ description: 'ID bảng lương' })
  payrollId: string;

  @ApiProperty({ description: 'Tên thưởng', example: 'Thưởng dự án' })
  name: string;

  @ApiProperty({ description: 'Số tiền thưởng', example: 1000000 })
  amount: number;

  @ApiProperty({ description: 'Mô tả thưởng', example: 'Thưởng hoàn thành dự án ABC', required: false })
  description?: string;

  @ApiProperty({ description: 'Có tính thuế hay không', example: true })
  taxable: boolean;

  @ApiProperty({ description: 'Còn hoạt động', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Thời gian tạo' })
  createdAt: Date;

  @ApiProperty({ description: 'Thời gian cập nhật' })
  updatedAt: Date;
}

/**
 * DTO cơ bản cho các hoạt động với khấu trừ
 */
export class DeductionDto {
  @ApiProperty({ description: 'Tên khấu trừ', example: 'Tạm ứng lương' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Số tiền khấu trừ', example: 2000000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Mô tả khấu trừ', example: 'Tạm ứng lương tháng trước', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

/**
 * DTO thêm khấu trừ mới
 */
export class CreateDeductionDto extends DeductionDto {}

/**
 * DTO cập nhật thông tin khấu trừ
 */
export class UpdateDeductionDto {
  @ApiProperty({ description: 'Tên khấu trừ', example: 'Tạm ứng lương', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Số tiền khấu trừ', example: 2000000, required: false })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({ description: 'Mô tả khấu trừ', example: 'Tạm ứng lương tháng trước', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

/**
 * DTO phản hồi thông tin khấu trừ
 */
export class DeductionResponseDto {
  @ApiProperty({ description: 'ID khấu trừ' })
  id: string;

  @ApiProperty({ description: 'ID bảng lương' })
  payrollId: string;

  @ApiProperty({ description: 'Tên khấu trừ', example: 'Tạm ứng lương' })
  name: string;

  @ApiProperty({ description: 'Số tiền khấu trừ', example: 2000000 })
  amount: number;

  @ApiProperty({ description: 'Mô tả khấu trừ', example: 'Tạm ứng lương tháng trước', required: false })
  description?: string;

  @ApiProperty({ description: 'Còn hoạt động', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Thời gian tạo' })
  createdAt: Date;

  @ApiProperty({ description: 'Thời gian cập nhật' })
  updatedAt: Date;
} 