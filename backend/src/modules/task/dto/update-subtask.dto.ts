import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSubTaskDto {
  @ApiPropertyOptional({ description: 'Nội dung công việc con', example: 'Thiết kế database' })
  @IsString()
  @IsOptional()
  content?: string;
  
  @ApiPropertyOptional({ description: 'Trạng thái hoàn thành', example: false })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
} 