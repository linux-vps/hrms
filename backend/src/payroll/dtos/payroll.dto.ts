import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

/**
 * DTO tạo bảng lương
 */
export class CreatePayrollDto {
  @ApiProperty({ description: 'ID nhân viên' })
  @IsUUID()
  employeeId: string;

  @ApiProperty({ description: 'Tháng', example: 1, minimum: 1, maximum: 12 })
  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;

  @ApiProperty({ description: 'Năm', example: 2023 })
  @IsNumber()
  @Min(2000)
  year: number;

  @ApiProperty({ description: 'Lương cơ bản', example: 10000000 })
  @IsNumber()
  baseSalary: number;

  @ApiProperty({ description: 'Số ngày làm việc', example: 22, required: false })
  @IsNumber()
  @IsOptional()
  workingDays?: number;

  @ApiProperty({ description: 'Số ngày làm việc tiêu chuẩn', example: 22, required: false })
  @IsNumber()
  @IsOptional()
  standardWorkingDays?: number;

  @ApiProperty({ description: 'Số giờ làm thêm', example: 10, required: false })
  @IsNumber()
  @IsOptional()
  overtimeHours?: number;

  @ApiProperty({ description: 'Tiền làm thêm giờ', example: 500000, required: false })
  @IsNumber()
  @IsOptional()
  overtimePay?: number;

  @ApiProperty({ description: 'Tổng phụ cấp', example: 1000000, required: false })
  @IsNumber()
  @IsOptional()
  totalAllowance?: number;

  @ApiProperty({ description: 'Tổng thưởng', example: 1000000, required: false })
  @IsNumber()
  @IsOptional()
  totalBonus?: number;

  @ApiProperty({ description: 'Tổng khấu trừ', example: 1000000, required: false })
  @IsNumber()
  @IsOptional()
  totalDeduction?: number;

  @ApiProperty({ description: 'Bảo hiểm xã hội', example: 800000, required: false })
  @IsNumber()
  @IsOptional()
  socialInsurance?: number;

  @ApiProperty({ description: 'Bảo hiểm y tế', example: 150000, required: false })
  @IsNumber()
  @IsOptional()
  healthInsurance?: number;

  @ApiProperty({ description: 'Bảo hiểm thất nghiệp', example: 100000, required: false })
  @IsNumber()
  @IsOptional()
  unemploymentInsurance?: number;

  @ApiProperty({ description: 'Thuế thu nhập cá nhân', example: 200000, required: false })
  @IsNumber()
  @IsOptional()
  personalIncomeTax?: number;

  @ApiProperty({ description: 'Ghi chú', required: false })
  @IsString()
  @IsOptional()
  note?: string;
}

/**
 * DTO cập nhật bảng lương
 */
export class UpdatePayrollDto {
  @ApiProperty({ description: 'Lương cơ bản', example: 10000000, required: false })
  @IsNumber()
  @IsOptional()
  baseSalary?: number;

  @ApiProperty({ description: 'Số ngày làm việc', example: 22, required: false })
  @IsNumber()
  @IsOptional()
  workingDays?: number;

  @ApiProperty({ description: 'Số ngày làm việc tiêu chuẩn', example: 22, required: false })
  @IsNumber()
  @IsOptional()
  standardWorkingDays?: number;

  @ApiProperty({ description: 'Số giờ làm thêm', example: 10, required: false })
  @IsNumber()
  @IsOptional()
  overtimeHours?: number;

  @ApiProperty({ description: 'Tiền làm thêm giờ', example: 500000, required: false })
  @IsNumber()
  @IsOptional()
  overtimePay?: number;

  @ApiProperty({ description: 'Tổng phụ cấp', example: 1000000, required: false })
  @IsNumber()
  @IsOptional()
  totalAllowance?: number;

  @ApiProperty({ description: 'Tổng thưởng', example: 1000000, required: false })
  @IsNumber()
  @IsOptional()
  totalBonus?: number;

  @ApiProperty({ description: 'Tổng khấu trừ', example: 1000000, required: false })
  @IsNumber()
  @IsOptional()
  totalDeduction?: number;

  @ApiProperty({ description: 'Bảo hiểm xã hội', example: 800000, required: false })
  @IsNumber()
  @IsOptional()
  socialInsurance?: number;

  @ApiProperty({ description: 'Bảo hiểm y tế', example: 150000, required: false })
  @IsNumber()
  @IsOptional()
  healthInsurance?: number;

  @ApiProperty({ description: 'Bảo hiểm thất nghiệp', example: 100000, required: false })
  @IsNumber()
  @IsOptional()
  unemploymentInsurance?: number;

  @ApiProperty({ description: 'Thuế thu nhập cá nhân', example: 200000, required: false })
  @IsNumber()
  @IsOptional()
  personalIncomeTax?: number;

  @ApiProperty({ description: 'Ghi chú', required: false })
  @IsString()
  @IsOptional()
  note?: string;
}

/**
 * DTO phản hồi thông tin bảng lương
 */
export class PayrollResponseDto {
  @ApiProperty({ description: 'ID bảng lương' })
  id: string;

  @ApiProperty({ description: 'ID nhân viên' })
  employeeId: string;

  @ApiProperty({ description: 'Tên nhân viên' })
  employeeName: string;

  @ApiProperty({ description: 'Tháng' })
  month: number;

  @ApiProperty({ description: 'Năm' })
  year: number;

  @ApiProperty({ description: 'Lương cơ bản' })
  baseSalary: number;

  @ApiProperty({ description: 'Số ngày làm việc' })
  workingDays: number;

  @ApiProperty({ description: 'Số giờ làm thêm' })
  overtimeHours: number;

  @ApiProperty({ description: 'Tiền làm thêm giờ' })
  overtimePay: number;

  @ApiProperty({ description: 'Tổng phụ cấp' })
  totalAllowance: number;

  @ApiProperty({ description: 'Tổng thưởng' })
  totalBonus: number;

  @ApiProperty({ description: 'Tổng khấu trừ' })
  totalDeduction: number;

  @ApiProperty({ description: 'Bảo hiểm xã hội' })
  socialInsurance: number;

  @ApiProperty({ description: 'Bảo hiểm y tế' })
  healthInsurance: number;

  @ApiProperty({ description: 'Bảo hiểm thất nghiệp' })
  unemploymentInsurance: number;

  @ApiProperty({ description: 'Thuế thu nhập cá nhân' })
  personalIncomeTax: number;

  @ApiProperty({ description: 'Lương thực lãnh' })
  netSalary: number;

  @ApiProperty({ description: 'Ghi chú', required: false })
  note?: string;

  @ApiProperty({ description: 'Thời gian tạo' })
  createdAt: Date;

  @ApiProperty({ description: 'Thời gian cập nhật' })
  updatedAt: Date;
} 