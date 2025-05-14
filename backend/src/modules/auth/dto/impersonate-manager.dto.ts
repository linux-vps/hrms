import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ImpersonateManagerDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email không được để trống' })
  @ApiProperty({
    description: 'Email của quản lý mà admin muốn đăng nhập với quyền của quản lý đó',
    example: 'manager@example.com'
  })
  email: string;
} 