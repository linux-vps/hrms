import { IsNotEmpty, IsString, IsOptional, IsDateString, IsUUID, IsArray, IsInt, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'Tiêu đề công việc', example: 'Xây dựng tính năng quản lý dự án' })
  @IsString()
  @IsOptional()
  title?: string;
  
  @ApiPropertyOptional({ description: 'Mô tả công việc', example: 'Xây dựng module quản lý dự án bao gồm các chức năng CRUD' })
  @IsString()
  @IsOptional()
  description?: string;
  
  @ApiPropertyOptional({ description: 'Mức độ ưu tiên từ 1-5 (thấp đến cao)', example: 3 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  priority?: number;
  
  @ApiPropertyOptional({ description: 'Ngày bắt đầu', example: '2023-01-01T09:00:00Z' })
  @IsDateString()
  @IsOptional()
  startDate?: string;
  
  @ApiPropertyOptional({ description: 'Ngày hết hạn', example: '2023-01-15T18:00:00Z' })
  @IsDateString()
  @IsOptional()
  dueDate?: string;
  
  @ApiPropertyOptional({ description: 'ID người giám sát', example: '123e4567-e89b-12d3-a456-426614174002' })
  @IsUUID()
  @IsOptional()
  supervisorId?: string;
  
  @ApiPropertyOptional({ description: 'Danh sách ID người được giao việc', type: [String], example: ['123e4567-e89b-12d3-a456-426614174003', '123e4567-e89b-12d3-a456-426614174004'] })
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  assigneeIds?: string[];
} 