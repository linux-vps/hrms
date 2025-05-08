import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { AttendanceStatus } from 'src/common/types/enums.type';

/**
 * DTO tạo bản ghi chấm công
 */
export class CreateAttendanceDto {
  @ApiProperty({ description: 'ID nhân viên' })
  @IsNotEmpty({ message: 'ID nhân viên không được trống' })
  @IsUUID(4, { message: 'ID nhân viên không hợp lệ' })
  employeeId: string;

  @ApiProperty({ description: 'Ngày chấm công' })
  @IsNotEmpty({ message: 'Ngày chấm công không được trống' })
  @IsDateString({}, { message: 'Ngày chấm công không hợp lệ' })
  date: Date;

  @ApiProperty({ description: 'Trạng thái chấm công', enum: AttendanceStatus })
  @IsOptional()
  @IsEnum(AttendanceStatus, { message: 'Trạng thái chấm công không hợp lệ' })
  status?: AttendanceStatus;

  @ApiProperty({ description: 'Ghi chú', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'ID ca làm việc', required: false })
  @IsOptional()
  @IsUUID(4, { message: 'ID ca làm việc không hợp lệ' })
  workShiftId?: string;

  @ApiProperty({ 
    description: 'Thời gian check-in (HH:MM)', 
    required: false,
    example: '08:05' 
  })
  @IsOptional()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Thời gian check-in phải có định dạng HH:MM',
  })
  checkInTime?: string;

  @ApiProperty({ 
    description: 'Thời gian check-out (HH:MM)', 
    required: false,
    example: '17:30' 
  })
  @IsOptional()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Thời gian check-out phải có định dạng HH:MM',
  })
  checkOutTime?: string;

  @ApiProperty({ 
    description: 'Đánh dấu đi muộn', 
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isLate?: boolean;

  @ApiProperty({ 
    description: 'Đánh dấu về sớm', 
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isEarlyLeave?: boolean;
}

/**
 * DTO cập nhật bản ghi chấm công
 */
export class UpdateAttendanceDto {
  @ApiProperty({ description: 'Trạng thái chấm công', enum: AttendanceStatus, required: false })
  @IsOptional()
  @IsEnum(AttendanceStatus, { message: 'Trạng thái chấm công không hợp lệ' })
  status?: AttendanceStatus;

  @ApiProperty({ description: 'Ghi chú', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'ID ca làm việc', required: false })
  @IsOptional()
  @IsUUID(4, { message: 'ID ca làm việc không hợp lệ' })
  workShiftId?: string;

  @ApiProperty({ 
    description: 'Thời gian check-in (HH:MM)', 
    required: false,
    example: '08:05' 
  })
  @IsOptional()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Thời gian check-in phải có định dạng HH:MM',
  })
  checkInTime?: string;

  @ApiProperty({ 
    description: 'Thời gian check-out (HH:MM)', 
    required: false,
    example: '17:30' 
  })
  @IsOptional()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Thời gian check-out phải có định dạng HH:MM',
  })
  checkOutTime?: string;

  @ApiProperty({ 
    description: 'Đánh dấu đi muộn', 
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isLate?: boolean;

  @ApiProperty({ 
    description: 'Đánh dấu về sớm', 
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isEarlyLeave?: boolean;
}

/**
 * DTO phản hồi thông tin chấm công
 */
export class AttendanceResponseDto {
  @ApiProperty({ description: 'ID chấm công' })
  id: string;

  @ApiProperty({ description: 'ID nhân viên' })
  employeeId: string;

  @ApiProperty({ description: 'Ngày chấm công' })
  date: Date;

  @ApiProperty({ description: 'Trạng thái chấm công', enum: AttendanceStatus })
  status: AttendanceStatus;

  @ApiProperty({ description: 'Ghi chú' })
  note: string;

  @ApiProperty({ description: 'ID ca làm việc' })
  workShiftId: string;

  @ApiProperty({ description: 'Thời gian check-in' })
  checkInTime: string;

  @ApiProperty({ description: 'Thời gian check-out' })
  checkOutTime: string;

  @ApiProperty({ description: 'Đánh dấu đi muộn' })
  isLate: boolean;

  @ApiProperty({ description: 'Đánh dấu về sớm' })
  isEarlyLeave: boolean;

  @ApiProperty({ description: 'Ngày tạo' })
  createdAt: Date;

  @ApiProperty({ description: 'Ngày cập nhật' })
  updatedAt: Date;
} 