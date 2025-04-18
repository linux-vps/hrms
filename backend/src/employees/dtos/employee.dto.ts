import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
  IsDateString,
  IsPositive,
  Min,
  Max,
} from 'class-validator';
import { DepartmentRole, Gender } from 'src/common/types/enums.type';

/**
 * DTO tạo nhân viên mới
 */
export class CreateEmployeeDto {
  @ApiProperty({
    description: 'Họ của nhân viên',
    example: 'Nguyễn',
  })
  @IsString()
  @IsNotEmpty({ message: 'Họ là bắt buộc' })
  firstName: string;

  @ApiProperty({
    description: 'Tên của nhân viên',
    example: 'Văn A',
  })
  @IsString()
  @IsNotEmpty({ message: 'Tên là bắt buộc' })
  lastName: string;

  @ApiPropertyOptional({
    description: 'Ngày sinh (yyyy-mm-dd)',
    example: '1990-01-01',
  })
  @IsOptional()
  @IsDateString({}, { message: 'Ngày sinh không hợp lệ' })
  dateOfBirth?: string;

  @ApiPropertyOptional({
    description: 'Giới tính',
    enum: Gender,
    example: Gender.MALE,
  })
  @IsOptional()
  @IsEnum(Gender, { message: 'Giới tính không hợp lệ' })
  gender?: Gender;

  @ApiPropertyOptional({
    description: 'Địa chỉ',
    example: 'Hà Nội',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'Email',
    example: 'employee@example.com',
  })
  // @IsEmail({}, { message: 'Email không hợp lệ' })
  // @IsNotEmpty({ message: 'Email là bắt buộc' })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Số điện thoại',
    example: '0987654321',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: 'ID phòng ban',
  })
  @IsOptional()
  @IsUUID()
  departmentId?: string;

  @ApiPropertyOptional({
    description: 'Vị trí công việc',
    example: 'Nhân viên',
  })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiPropertyOptional({
    description: 'Vai trò trong phòng ban',
    enum: DepartmentRole,
    default: DepartmentRole.MEMBER,
  })
  @IsOptional()
  @IsEnum(DepartmentRole, { message: 'Vai trò không hợp lệ' })
  role?: DepartmentRole;

  @ApiPropertyOptional({
    description: 'Mức lương',
    example: 10000000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Lương phải là số' })
  @IsPositive({ message: 'Lương phải là số dương' })
  salary?: number;

  @ApiPropertyOptional({
    description: 'Ngày tuyển dụng (yyyy-mm-dd)',
    example: '2023-01-01',
  })
  @IsOptional()
  @IsDateString({}, { message: 'Ngày tuyển dụng không hợp lệ' })
  hireDate?: string;

  @ApiPropertyOptional({
    description: 'Số ngày nghỉ phép mỗi tháng',
    default: 5,
    minimum: 0,
    maximum: 30,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Số ngày nghỉ phép phải là số' })
  @Min(0, { message: 'Số ngày nghỉ phép không được âm' })
  @Max(30, { message: 'Số ngày nghỉ phép tối đa là 30' })
  leaveDaysPerMonth?: number;
}

/**
 * DTO cập nhật nhân viên
 */
export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @ApiPropertyOptional({
    description: 'Số ngày nghỉ phép còn lại',
    minimum: 0,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Số ngày nghỉ phép còn lại phải là số' })
  @Min(0, { message: 'Số ngày nghỉ phép còn lại không được âm' })
  remainingLeaveDays?: number;
}

/**
 * DTO cập nhật lương nhân viên
 */
export class UpdateSalaryDto {
  @ApiProperty({
    description: 'Mức lương mới',
    example: 10000000,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'Lương phải là số' })
  @IsPositive({ message: 'Lương phải là số dương' })
  salary: number;
} 