import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { LeaveStatus, LeaveType } from 'src/common/types/enums.type';

/**
 * DTO tạo yêu cầu nghỉ phép
 */
export class CreateLeaveDto {
  @ApiProperty({ description: 'ID nhân viên' })
  @IsUUID()
  employeeId: string;

  @ApiProperty({ 
    description: 'Loại nghỉ phép', 
    enum: LeaveType,
    default: LeaveType.ANNUAL
  })
  @IsEnum(LeaveType)
  type: LeaveType;

  @ApiProperty({ description: 'Ngày bắt đầu', example: '2023-01-01' })
  @IsDate()
  startDate: Date;

  @ApiProperty({ description: 'Ngày kết thúc', example: '2023-01-02' })
  @IsDate()
  endDate: Date;

  @ApiProperty({ description: 'Số ngày nghỉ' })
  @IsNumber()
  days: number;

  @ApiProperty({ description: 'Lý do nghỉ phép' })
  @IsString()
  reason: string;
}

/**
 * DTO cập nhật yêu cầu nghỉ phép
 */
export class UpdateLeaveDto {
  @ApiProperty({ 
    description: 'Loại nghỉ phép', 
    enum: LeaveType,
    required: false
  })
  @IsEnum(LeaveType)
  @IsOptional()
  type?: LeaveType;

  @ApiProperty({ description: 'Ngày bắt đầu', example: '2023-01-01', required: false })
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({ description: 'Ngày kết thúc', example: '2023-01-02', required: false })
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({ description: 'Số ngày nghỉ', required: false })
  @IsNumber()
  @IsOptional()
  days?: number;

  @ApiProperty({ description: 'Lý do nghỉ phép', required: false })
  @IsString()
  @IsOptional()
  reason?: string;
}

/**
 * DTO duyệt yêu cầu nghỉ phép
 */
export class ApproveLeaveDto {
  @ApiProperty({ 
    description: 'Trạng thái duyệt', 
    enum: LeaveStatus,
    default: LeaveStatus.APPROVED
  })
  @IsEnum(LeaveStatus)
  status: LeaveStatus;

  @ApiProperty({ description: 'Ghi chú', required: false })
  @IsString()
  @IsOptional()
  note?: string;
}

/**
 * DTO phản hồi thông tin nghỉ phép
 */
export class LeaveResponseDto {
  @ApiProperty({ description: 'ID yêu cầu nghỉ phép' })
  id: string;

  @ApiProperty({ description: 'ID nhân viên' })
  employeeId: string;

  @ApiProperty({ description: 'Tên nhân viên' })
  employeeName: string;

  @ApiProperty({ description: 'Loại nghỉ phép', enum: LeaveType })
  type: LeaveType;

  @ApiProperty({ description: 'Ngày bắt đầu' })
  startDate: Date;

  @ApiProperty({ description: 'Ngày kết thúc' })
  endDate: Date;

  @ApiProperty({ description: 'Số ngày nghỉ' })
  days: number;

  @ApiProperty({ description: 'Lý do nghỉ phép' })
  reason: string;

  @ApiProperty({ description: 'Trạng thái', enum: LeaveStatus })
  status: LeaveStatus;

  @ApiProperty({ description: 'ID người duyệt', required: false })
  approvedById?: string;

  @ApiProperty({ description: 'Tên người duyệt', required: false })
  approvedByName?: string;

  @ApiProperty({ description: 'Ngày duyệt', required: false })
  approvalDate?: Date;

  @ApiProperty({ description: 'Thời gian tạo' })
  createdAt: Date;

  @ApiProperty({ description: 'Thời gian cập nhật' })
  updatedAt: Date;
} 