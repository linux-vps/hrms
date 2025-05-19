import { IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskStatusDto {
  @ApiProperty({ 
    description: 'Trạng thái công việc mới', 
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS
  })
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
  
  @ApiPropertyOptional({ 
    description: 'Ghi chú khi cập nhật trạng thái', 
    example: 'Đã bắt đầu làm việc trên tính năng này'
  })
  @IsString()
  @IsOptional()
  comment?: string;
} 