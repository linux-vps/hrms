import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO cho phân trang
 */
export class PaginationDto {
  @ApiProperty({
    description: 'Số trang',
    example: 1,
    default: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiProperty({
    description: 'Số lượng dữ liệu trên mỗi trang',
    example: 10,
    default: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  /**
   * Tính offset cho truy vấn phân trang
   * @returns Vị trí bắt đầu lấy dữ liệu
   */
  offset(): number {
    return (this.page - 1) * this.limit;
  }
}

/**
 * DTO cho kết quả phân trang
 */
export class PaginatedResultDto<T> {
  @ApiProperty({
    description: 'Dữ liệu theo trang',
    isArray: true,
  })
  data: T[];

  @ApiProperty({
    description: 'Tổng số trang',
    example: 10,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Tổng số bản ghi',
    example: 100,
  })
  totalItems: number;

  @ApiProperty({
    description: 'Trang hiện tại',
    example: 1,
  })
  currentPage: number;

  constructor(data: T[], totalItems: number, pagination: PaginationDto) {
    this.data = data;
    this.totalItems = totalItems;
    this.currentPage = pagination.page;
    this.totalPages = Math.ceil(totalItems / pagination.limit);
  }
} 