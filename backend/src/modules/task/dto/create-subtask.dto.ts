import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubTaskDto {
  @ApiProperty({ description: 'Nội dung công việc con', example: 'Thiết kế database' })
  @IsString()
  @IsNotEmpty()
  content: string;
  
  @ApiPropertyOptional({ description: 'Trạng thái hoàn thành', example: false, default: false })
  @IsBoolean()
  @IsOptional()
  completed?: boolean = false;
} 