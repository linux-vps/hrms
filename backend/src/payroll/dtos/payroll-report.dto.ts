import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDateString, IsUUID } from 'class-validator';

/**
 * DTO yêu cầu báo cáo lương theo phòng ban
 */
export class DepartmentReportQueryDto {
  @ApiProperty({ description: 'ID phòng ban', required: false })
  @IsUUID()
  @IsOptional()
  departmentId?: string;

  @ApiProperty({ description: 'Tháng', required: false, minimum: 1, maximum: 12 })
  @IsNumber()
  @IsOptional()
  month?: number;

  @ApiProperty({ description: 'Năm', required: false })
  @IsNumber()
  @IsOptional()
  year?: number;
}

/**
 * DTO phản hồi báo cáo lương theo phòng ban
 */
export class DepartmentReportResponseDto {
  @ApiProperty({ description: 'ID phòng ban' })
  departmentId: string;

  @ApiProperty({ description: 'Tên phòng ban' })
  departmentName: string;

  @ApiProperty({ description: 'Tổng số nhân viên' })
  totalEmployees: number;

  @ApiProperty({ description: 'Tổng chi phí lương' })
  totalSalary: number;

  @ApiProperty({ description: 'Lương trung bình' })
  averageSalary: number;

  @ApiProperty({ description: 'Lương cao nhất' })
  maxSalary: number;

  @ApiProperty({ description: 'Lương thấp nhất' })
  minSalary: number;

  @ApiProperty({ description: 'Tháng' })
  month: number;

  @ApiProperty({ description: 'Năm' })
  year: number;
}

/**
 * DTO phản hồi tổng hợp chi phí lương
 */
export class SalarySummaryResponseDto {
  @ApiProperty({ description: 'Tổng chi phí lương cơ bản' })
  totalBaseSalary: number;

  @ApiProperty({ description: 'Tổng chi phí làm thêm giờ' })
  totalOvertimePay: number;

  @ApiProperty({ description: 'Tổng chi phí phụ cấp' })
  totalAllowance: number;

  @ApiProperty({ description: 'Tổng chi phí thưởng' })
  totalBonus: number;

  @ApiProperty({ description: 'Tổng khấu trừ' })
  totalDeduction: number;

  @ApiProperty({ description: 'Tổng chi phí lương thực trả' })
  totalNetSalary: number;

  @ApiProperty({ description: 'Tổng bảo hiểm xã hội' })
  totalSocialInsurance: number;

  @ApiProperty({ description: 'Tổng bảo hiểm y tế' })
  totalHealthInsurance: number;

  @ApiProperty({ description: 'Tổng bảo hiểm thất nghiệp' })
  totalUnemploymentInsurance: number;

  @ApiProperty({ description: 'Tổng thuế thu nhập cá nhân' })
  totalPersonalIncomeTax: number;

  @ApiProperty({ description: 'Tháng' })
  month: number;

  @ApiProperty({ description: 'Năm' })
  year: number;
} 