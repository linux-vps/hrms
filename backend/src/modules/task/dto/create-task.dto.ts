import { IsNotEmpty, IsString, IsOptional, IsDateString, IsUUID, IsArray, IsInt, Min, Max, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../entities/task.entity';
import { CreateSubTaskDto } from './create-subtask.dto';

export class CreateTaskDto {
  @ApiProperty({ description: 'Tiêu đề công việc', example: 'Xây dựng tính năng quản lý dự án' })
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @ApiPropertyOptional({ description: 'Mô tả công việc', example: 'Xây dựng module quản lý dự án bao gồm các chức năng CRUD' })
  @IsString()
  @IsOptional()
  description?: string;
  
  @ApiProperty({ description: 'Mức độ ưu tiên từ 1-5 (thấp đến cao)', example: 3, default: 3 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  priority?: number = 3;
  
  @ApiPropertyOptional({ description: 'Ngày bắt đầu', example: '2023-01-01T09:00:00Z' })
  @IsDateString()
  @IsOptional()
  startDate?: string;
  
  @ApiPropertyOptional({ description: 'Ngày hết hạn', example: '2023-01-15T18:00:00Z' })
  @IsDateString()
  @IsOptional()
  dueDate?: string;
  
  @ApiProperty({ description: 'ID dự án', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  projectId: string;
  
  @ApiProperty({ description: 'ID người giao việc', example: '123e4567-e89b-12d3-a456-426614174001' })
  @IsUUID()
  @IsNotEmpty()
  assignerId: string;
  
  @ApiProperty({ description: 'ID người giám sát', example: '123e4567-e89b-12d3-a456-426614174002' })
  @IsUUID()
  @IsNotEmpty()
  supervisorId: string;
  
  @ApiProperty({ description: 'Danh sách ID người được giao việc', type: [String], example: ['123e4567-e89b-12d3-a456-426614174003', '123e4567-e89b-12d3-a456-426614174004'] })
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsNotEmpty()
  assigneeIds: string[];
  
  @ApiPropertyOptional({ description: 'Danh sách các subtask', type: [CreateSubTaskDto], example: [{ content: 'Thiết kế database' }, { content: 'Tạo các API endpoints' }] })
  @IsArray()
  @IsOptional()
  subtasks?: CreateSubTaskDto[];
} 