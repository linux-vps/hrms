import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

/**
 * DTO đăng nhập
 */
export class LoginDto {
  @ApiProperty({
    description: 'Email đăng nhập',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @ApiProperty({
    description: 'Mật khẩu',
    example: 'Password123!',
  })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  password: string;
}

/**
 * DTO đăng ký
 */
export class RegisterDto {
  @ApiProperty({
    description: 'Email đăng ký',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @ApiProperty({
    description: 'Mật khẩu',
    example: 'Password123!',
  })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    {
      message:
        'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
    },
  )
  password: string;
}

/**
 * DTO đáp ứng đăng nhập
 */
export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT Token',
  })
  token: string;

  @ApiProperty({
    description: 'ID người dùng',
  })
  userId: string;

  @ApiProperty({
    description: 'ID nhân viên',
    required: false,
  })
  employeeId?: string;

  @ApiProperty({
    description: 'Vai trò người dùng',
    enum: ['admin', 'employee'],
  })
  role: string;
} 