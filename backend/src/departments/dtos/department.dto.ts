import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * DTO tạo phòng ban mới
 */
export class CreateDepartmentDto {
  @ApiProperty({
    description: 'Tên phòng ban',
    example: 'Phòng Kỹ thuật',
  })
  @IsString({ message: 'Tên phòng ban phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên phòng ban không được để trống' })
  name: string;

  @ApiPropertyOptional({
    description: 'Mô tả phòng ban',
    example: 'Phòng chuyên về nghiên cứu và phát triển kỹ thuật',
  })
  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi' })
  description?: string;
}

/**
 * DTO cập nhật phòng ban
 */
export class UpdateDepartmentDto extends CreateDepartmentDto {} 