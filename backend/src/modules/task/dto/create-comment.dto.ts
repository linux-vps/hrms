import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'Nội dung bình luận', example: 'Đã hoàn thành phần xử lý dữ liệu' })
  @IsString()
  @IsNotEmpty()
  content: string;
  
  @ApiPropertyOptional({ description: 'Đánh dấu là tóm tắt công việc', example: false, default: false })
  @IsBoolean()
  @IsOptional()
  isSummary?: boolean = false;
  
  @ApiProperty({ description: 'ID công việc', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  taskId: string;
} 