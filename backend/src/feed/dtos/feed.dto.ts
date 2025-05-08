import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

/**
 * DTO tạo thông báo mới
 */
export class CreateFeedDto {
  @ApiProperty({ description: 'Tiêu đề thông báo' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Nội dung thông báo' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'ID phòng ban (để trống nếu là thông báo toàn cục)', required: false })
  @IsUUID()
  @IsOptional()
  departmentId?: string;

  @ApiProperty({ description: 'Đánh dấu là thông báo quan trọng', required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isImportant?: boolean;
}

/**
 * DTO cập nhật thông báo
 */
export class UpdateFeedDto {
  @ApiProperty({ description: 'Tiêu đề thông báo', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Nội dung thông báo', required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ description: 'ID phòng ban (để trống nếu là thông báo toàn cục)', required: false })
  @IsUUID()
  @IsOptional()
  departmentId?: string;

  @ApiProperty({ description: 'Đánh dấu là thông báo quan trọng', required: false })
  @IsBoolean()
  @IsOptional()
  isImportant?: boolean;
}

/**
 * DTO phản hồi thông tin thông báo
 */
export class FeedResponseDto {
  @ApiProperty({ description: 'ID thông báo' })
  id: string;

  @ApiProperty({ description: 'Tiêu đề thông báo' })
  title: string;

  @ApiProperty({ description: 'Nội dung thông báo' })
  content: string;

  @ApiProperty({ description: 'ID người tạo' })
  createdById: string;

  @ApiProperty({ description: 'Tên người tạo' })
  createdByName: string;

  @ApiProperty({ description: 'ID phòng ban', required: false })
  departmentId?: string;

  @ApiProperty({ description: 'Tên phòng ban', required: false })
  departmentName?: string;

  @ApiProperty({ description: 'Thời gian tạo' })
  timestamp: Date;

  @ApiProperty({ description: 'Thông báo quan trọng' })
  isImportant: boolean;

  @ApiProperty({ description: 'Thời gian tạo' })
  createdAt: Date;

  @ApiProperty({ description: 'Thời gian cập nhật' })
  updatedAt: Date;
} 