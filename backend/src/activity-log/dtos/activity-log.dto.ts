import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

/**
 * DTO phản hồi thông tin nhật ký hoạt động
 */
export class ActivityLogResponseDto {
  @ApiProperty({ description: 'ID nhật ký' })
  id: string;

  @ApiProperty({ description: 'ID người dùng' })
  userId: string;

  @ApiProperty({ description: 'Tên người dùng' })
  userName: string;

  @ApiProperty({ description: 'Hành động' })
  action: string;

  @ApiProperty({ description: 'Loại thực thể', required: false })
  entityType?: string;

  @ApiProperty({ description: 'ID thực thể', required: false })
  entityId?: string;

  @ApiProperty({ description: 'Chi tiết', required: false })
  details?: string;

  @ApiProperty({ description: 'Địa chỉ IP', required: false })
  ipAddress?: string;

  @ApiProperty({ description: 'Thời gian thực hiện' })
  timestamp: Date;
}

/**
 * DTO truy vấn nhật ký hoạt động
 */
export class ActivityLogQueryDto {
  @ApiProperty({ description: 'ID người dùng', required: false })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({ description: 'Hành động', required: false })
  @IsString()
  @IsOptional()
  action?: string;

  @ApiProperty({ description: 'Loại thực thể', required: false })
  @IsString()
  @IsOptional()
  entityType?: string;

  @ApiProperty({ description: 'ID thực thể', required: false })
  @IsString()
  @IsOptional()
  entityId?: string;

  @ApiProperty({ description: 'Từ ngày', required: false })
  @IsDate()
  @IsOptional()
  fromDate?: Date;

  @ApiProperty({ description: 'Đến ngày', required: false })
  @IsDate()
  @IsOptional()
  toDate?: Date;
} 