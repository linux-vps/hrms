import { IsNotEmpty, IsString, IsEmail, IsDate, IsOptional, IsUUID, IsEnum, ValidateIf, IsDateString, Matches, IsNumber, Min, IsDecimal } from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from '../../../common/enums/role.enum';
import { Position } from '../../../common/enums/position.enum';
import { Education } from '../../../common/enums/education.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmployeeDto {

  @ApiProperty({ description: 'Họ tên đầy đủ của nhân viên', example: 'Nguyễn Văn A' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ 
    description: 'Mật khẩu (phải có ít nhất 6 ký tự, bao gồm chữ hoa, số và ký tự đặc biệt)',
    example: 'Password123!'
  })
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/,
    { message: 'Password phải có ít nhất 6 ký tự, bao gồm chữ hoa, số và ký tự đặc biệt' },
  )
  password: string;

  @ApiPropertyOptional({ description: 'Đường dẫn đến ảnh đại diện', example: 'https://example.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ description: 'Số điện thoại liên hệ', example: '+84987654321' })
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^\+?\d{10,15}$/,
    { message: 'Số điện thoại không hợp lệ, phải bao gồm mã quốc gia và từ 10 đến 15 chữ số' },
  )
  phoneNumber: string;

  @ApiProperty({ description: 'Địa chỉ email (dùng để đăng nhập)', example: 'example@email.com' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiPropertyOptional({ description: 'Ngày sinh (ISO 8601 format)', example: '1990-01-01' })
  @IsOptional()
  @IsDateString({}, { message: 'birthDate phải là chuỗi ngày tháng hợp lệ theo ISO 8601' })
  birthDate?: string;

  @ApiPropertyOptional({ 
    description: 'ID của phòng ban', 
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174001'
  })
  @IsOptional()
  @IsNotEmpty({ message: 'departmentId là bắt buộc đối' })
  @IsUUID('4', { message: 'departmentId phải là UUID hợp lệ' })
  departmentId?: string;

  @ApiPropertyOptional({ 
    description: 'Vai trò của nhân viên trong hệ thống',
    enum: Role,
    default: Role.USER,
    example: Role.USER
  })
  @IsOptional()
  @IsEnum(Role, { message: 'role phải là một trong các giá trị ADMIN, USER, MANAGER' })
  role?: Role;

  // Thông tin mở rộng
  @ApiPropertyOptional({ description: 'Địa chỉ liên hệ', example: 'Số 1, Đường ABC, Quận XYZ, TP. Hồ Chí Minh' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Số CMND/CCCD', example: '123456789012' })
  @IsOptional()
  @IsString()
  identityCard?: string;

  @ApiPropertyOptional({ description: 'Ngày vào làm (ISO 8601 format)', example: '2022-01-01' })
  @IsOptional()
  @IsDateString({}, { message: 'joinDate phải là chuỗi ngày tháng hợp lệ theo ISO 8601' })
  joinDate?: string;

  @ApiPropertyOptional({ 
    description: 'Chức vụ',
    enum: Position,
    example: Position.SENIOR
  })
  @IsOptional()
  @IsEnum(Position, { message: 'position phải là một giá trị hợp lệ' })
  position?: Position;

  @ApiPropertyOptional({ 
    description: 'Trình độ học vấn',
    enum: Education,
    example: Education.BACHELOR
  })
  @IsOptional()
  @IsEnum(Education, { message: 'education phải là một giá trị hợp lệ' })
  education?: Education;

  @ApiPropertyOptional({ description: 'Kinh nghiệm làm việc', example: '5 năm kinh nghiệm phát triển phần mềm' })
  @IsOptional()
  @IsString()
  workExperience?: string;

  @ApiPropertyOptional({ description: 'Lương cơ bản', type: 'number', example: 10000000 })
  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' }, { message: 'baseSalary phải là số thập phân hợp lệ' })
  @Transform(({ value }) => parseFloat(value))
  baseSalary?: number;

  @ApiPropertyOptional({ description: 'Số tài khoản ngân hàng', example: '1234567890' })
  @IsOptional()
  @IsString()
  bankAccount?: string;

  @ApiPropertyOptional({ description: 'Tên ngân hàng', example: 'Vietcombank' })
  @IsOptional()
  @IsString()
  bankName?: string;

  @ApiPropertyOptional({ description: 'Mã số thuế cá nhân', example: '1234567890' })
  @IsOptional()
  @IsString()
  taxCode?: string;

  @ApiPropertyOptional({ description: 'Mã số bảo hiểm xã hội', example: '1234567890' })
  @IsOptional()
  @IsString()
  insuranceCode?: string;
}