import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({ description: 'Tên phòng ban', example: 'Phòng Kỹ thuật' })
  @IsNotEmpty()
  @IsString()
  departmentName: string;

  @ApiPropertyOptional({ description: 'Mô tả về phòng ban', example: 'Phụ trách các vấn đề kỹ thuật và phát triển sản phẩm' })
  @IsOptional()
  @IsString()
  description?: string;
}
