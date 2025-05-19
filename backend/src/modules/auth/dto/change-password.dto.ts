import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Mật khẩu hiện tại',
    example: 'CurrentPassword123'
  })
  @IsString({ message: 'Mật khẩu hiện tại phải là chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu hiện tại không được để trống' })
  currentPassword: string;

  @ApiProperty({
    description: 'Mật khẩu mới, tối thiểu 6 ký tự',
    example: 'NewPassword123'
  })
  @IsString({ message: 'Mật khẩu mới phải là chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
  @MinLength(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' })
  newPassword: string;
} 