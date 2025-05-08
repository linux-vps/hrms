import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { WorkShiftType } from 'src/common/types/enums.type';

/**
 * DTO tạo ca làm việc
 */
export class CreateWorkShiftDto {
  @ApiProperty({ description: 'Tên ca làm việc' })
  @IsNotEmpty({ message: 'Tên ca làm việc không được để trống' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Mô tả ca làm việc', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Loại ca làm việc',
    enum: WorkShiftType,
    default: WorkShiftType.FULL_DAY,
  })
  @IsEnum(WorkShiftType, { message: 'Loại ca làm việc không hợp lệ' })
  @IsOptional()
  type?: WorkShiftType;

  @ApiProperty({
    description: 'Thời gian bắt đầu ca (HH:MM)',
    example: '08:00',
  })
  @IsNotEmpty({ message: 'Thời gian bắt đầu không được để trống' })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Thời gian bắt đầu phải có định dạng HH:MM',
  })
  startTime: string;

  @ApiProperty({
    description: 'Thời gian kết thúc ca (HH:MM)',
    example: '17:00',
  })
  @IsNotEmpty({ message: 'Thời gian kết thúc không được để trống' })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Thời gian kết thúc phải có định dạng HH:MM',
  })
  endTime: string;

  @ApiProperty({
    description: 'Thời gian bắt đầu nghỉ giữa ca (HH:MM)',
    required: false,
    example: '12:00',
  })
  @IsOptional()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Thời gian bắt đầu nghỉ phải có định dạng HH:MM',
  })
  breakStart?: string;

  @ApiProperty({
    description: 'Thời gian kết thúc nghỉ giữa ca (HH:MM)',
    required: false,
    example: '13:00',
  })
  @IsOptional()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Thời gian kết thúc nghỉ phải có định dạng HH:MM',
  })
  breakEnd?: string;

  @ApiProperty({ description: 'Trạng thái hoạt động', default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

/**
 * DTO cập nhật ca làm việc
 */
export class UpdateWorkShiftDto {
  @ApiProperty({ description: 'Tên ca làm việc', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Mô tả ca làm việc', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Loại ca làm việc',
    enum: WorkShiftType,
    required: false,
  })
  @IsEnum(WorkShiftType, { message: 'Loại ca làm việc không hợp lệ' })
  @IsOptional()
  type?: WorkShiftType;

  @ApiProperty({
    description: 'Thời gian bắt đầu ca (HH:MM)',
    required: false,
    example: '08:00',
  })
  @IsOptional()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Thời gian bắt đầu phải có định dạng HH:MM',
  })
  startTime?: string;

  @ApiProperty({
    description: 'Thời gian kết thúc ca (HH:MM)',
    required: false,
    example: '17:00',
  })
  @IsOptional()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Thời gian kết thúc phải có định dạng HH:MM',
  })
  endTime?: string;

  @ApiProperty({
    description: 'Thời gian bắt đầu nghỉ giữa ca (HH:MM)',
    required: false,
    example: '12:00',
  })
  @IsOptional()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Thời gian bắt đầu nghỉ phải có định dạng HH:MM',
  })
  breakStart?: string;

  @ApiProperty({
    description: 'Thời gian kết thúc nghỉ giữa ca (HH:MM)',
    required: false,
    example: '13:00',
  })
  @IsOptional()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Thời gian kết thúc nghỉ phải có định dạng HH:MM',
  })
  breakEnd?: string;

  @ApiProperty({
    description: 'Trạng thái hoạt động',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

/**
 * DTO đáp ứng ca làm việc
 */
export class WorkShiftResponseDto {
  @ApiProperty({ description: 'ID ca làm việc' })
  id: string;

  @ApiProperty({ description: 'Tên ca làm việc' })
  name: string;

  @ApiProperty({ description: 'Mô tả ca làm việc' })
  description?: string;

  @ApiProperty({ description: 'Loại ca làm việc', enum: WorkShiftType })
  type: WorkShiftType;

  @ApiProperty({ description: 'Thời gian bắt đầu ca' })
  startTime: string;

  @ApiProperty({ description: 'Thời gian kết thúc ca' })
  endTime: string;

  @ApiProperty({ description: 'Thời gian bắt đầu nghỉ giữa ca' })
  breakStart?: string;

  @ApiProperty({ description: 'Thời gian kết thúc nghỉ giữa ca' })
  breakEnd?: string;

  @ApiProperty({ description: 'Trạng thái hoạt động' })
  active: boolean;

  @ApiProperty({ description: 'Ngày tạo' })
  createdAt: Date;

  @ApiProperty({ description: 'Ngày cập nhật' })
  updatedAt: Date;
} 