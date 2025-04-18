import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO phản hồi cơ bản cho các API
 */
export class ApiResponseDto<T = any> {
  @ApiProperty({ description: 'Trạng thái thành công' })
  success: boolean;

  @ApiProperty({ description: 'Thông báo' })
  message: string;

  @ApiProperty({ description: 'Dữ liệu phản hồi', required: false })
  data?: T;

  @ApiProperty({ description: 'Thời gian phản hồi' })
  timestamp: Date;

  constructor(
    success: boolean,
    message: string,
    data?: T,
    timestamp: Date = new Date(),
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.timestamp = timestamp;
  }
}

/**
 * Hàm tạo phản hồi thành công
 * @param message Thông báo
 * @param data Dữ liệu
 * @returns DTO phản hồi API
 */
export function createSuccessResponse<T>(
  message: string,
  data?: T,
): ApiResponseDto<T> {
  return new ApiResponseDto<T>(true, message, data);
}

/**
 * Hàm tạo phản hồi lỗi
 * @param message Thông báo lỗi
 * @returns DTO phản hồi API
 */
export function createErrorResponse(message: string): ApiResponseDto {
  return new ApiResponseDto(false, message);
} 