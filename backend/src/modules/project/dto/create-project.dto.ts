import { IsNotEmpty, IsString, IsOptional, IsDateString, IsUUID, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Tên dự án', example: 'Dự án quản lý nhân sự' })
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiPropertyOptional({ description: 'Mô tả dự án', example: 'Dự án xây dựng hệ thống quản lý nhân sự cho công ty' })
  @IsString()
  @IsOptional()
  description?: string;
  
  @ApiPropertyOptional({ description: 'Ngày bắt đầu dự án', example: '2023-01-01' })
  @IsDateString()
  @IsOptional()
  startDate?: string;
  
  @ApiPropertyOptional({ description: 'Ngày kết thúc dự án', example: '2023-12-31' })
  @IsDateString()
  @IsOptional()
  endDate?: string;
  
  @ApiProperty({ description: 'ID phòng ban', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  departmentId: string;
  
  @ApiProperty({ description: 'ID người quản lý dự án', example: '123e4567-e89b-12d3-a456-426614174001' })
  @IsUUID()
  @IsNotEmpty()
  managerId: string;
  
  @ApiPropertyOptional({ description: 'Danh sách ID thành viên dự án', type: [String], example: ['123e4567-e89b-12d3-a456-426614174002', '123e4567-e89b-12d3-a456-426614174003'] })
  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  memberIds?: string[];
} 