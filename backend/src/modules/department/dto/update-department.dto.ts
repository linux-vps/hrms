import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDepartmentDto {
  @ApiPropertyOptional({ description: 'Tên phòng ban', example: 'Phòng Kỹ thuật (Đã cập nhật)' })
  @IsOptional()
  @IsString()
  departmentName?: string;

  @ApiPropertyOptional({ description: 'Mô tả về phòng ban', example: 'Phụ trách các vấn đề kỹ thuật và phát triển sản phẩm mới' })
  @IsOptional()
  @IsString()
  description?: string;
}
