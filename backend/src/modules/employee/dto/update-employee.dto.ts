import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsEnum, IsOptional, IsString, IsNumber, IsDateString, ValidateIf, IsBoolean } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Position } from '../../../common/enums/position.enum';
import { Education } from '../../../common/enums/education.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEmployeeDto extends PartialType(
  OmitType(CreateEmployeeDto, ['password'] as const)
) {
  @ApiPropertyOptional({ description: 'Họ tên đầy đủ của nhân viên', example: 'Nguyễn Văn A' })
  @IsOptional()
  @ValidateIf((o, v) => v !== null && v !== '')
  @IsString({ message: 'fullName phải là chuỗi' })
  @Transform(({ value }) => value === '' ? null : value)
  fullName?: string | null;

  @ApiPropertyOptional({ description: 'Số điện thoại liên hệ', example: '+84987654321' })
  @IsOptional()
  @ValidateIf((o, v) => v !== null && v !== '')
  @IsString({ message: 'phoneNumber phải là chuỗi' })
  @Transform(({ value }) => value === '' ? null : value)
  phoneNumber?: string | null;

  @ApiPropertyOptional({ description: 'Địa chỉ liên hệ', example: 'Số 1, Đường ABC, Quận XYZ, TP. Hồ Chí Minh' })
  @IsOptional()
  @ValidateIf((o, v) => v !== null && v !== '')
  @IsString({ message: 'address phải là chuỗi' })
  @Transform(({ value }) => value === '' ? null : value)
  address?: string | null;

  @ApiPropertyOptional({ description: 'Số CMND/CCCD', example: '123456789012' })
  @IsOptional()
  @ValidateIf((o, v) => v !== null && v !== '')
  @IsString({ message: 'identityCard phải là chuỗi' })
  @Transform(({ value }) => value === '' ? null : value)
  identityCard?: string | null;

  @ApiPropertyOptional({ 
    description: 'Chức vụ',
    enum: Position,
    example: Position.SENIOR,
    nullable: true
  })
  @IsOptional()
  @ValidateIf((o, v) => v !== null && v !== '')
  @Transform(({ value }) => {
    if (value === null || value === '') return null;
    
    // Xử lý chuỗi không phân biệt chữ hoa/thường
    if (typeof value === 'string') {
      const lowerValue = value.toLowerCase();
      for (const key in Position) {
        if (Position[key].toLowerCase() === lowerValue) {
          return Position[key];
        }
      }
    }
    
    return value;
  })
  @IsEnum(Position, { 
    message: `position phải là một giá trị hợp lệ trong: ${Object.values(Position).join(', ')}`
  })
  position?: Position | null;

  @ApiPropertyOptional({ 
    description: 'Trình độ học vấn',
    enum: Education,
    example: Education.BACHELOR,
    nullable: true
  })
  @IsOptional()
  @ValidateIf((o, v) => v !== null && v !== '')
  @Transform(({ value }) => {
    if (value === null || value === '') return null;
    
    // Xử lý chuỗi không phân biệt chữ hoa/thường
    if (typeof value === 'string') {
      const lowerValue = value.toLowerCase();
      for (const key in Education) {
        if (Education[key].toLowerCase() === lowerValue) {
          return Education[key];
        }
      }
    }
    
    return value;
  })
  @IsEnum(Education, { 
    message: `education phải là một giá trị hợp lệ trong: ${Object.values(Education).join(', ')}`
  })
  education?: Education | null;

  @ApiPropertyOptional({ description: 'Lương cơ bản', type: 'number', example: 10000000, nullable: true })
  @IsOptional()
  @ValidateIf((o, v) => v !== null && v !== '')
  @Transform(({ value }) => {
    if (value === null || value === '') return null;
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(numValue) ? null : numValue;
  })
  @IsNumber({}, { message: 'baseSalary phải là số' })
  baseSalary?: number | null;

  @ApiPropertyOptional({ description: 'Ngày sinh (ISO 8601 format)', example: '1990-01-01', nullable: true })
  @IsOptional()
  @ValidateIf((o, v) => v !== null && v !== '')
  @Transform(({ value }) => value === '' ? null : value)
  @IsDateString({}, { message: 'birthDate phải là chuỗi ngày tháng hợp lệ theo ISO 8601' })
  birthDate?: string | null;

  @ApiPropertyOptional({ description: 'Ngày vào làm (ISO 8601 format)', example: '2022-01-01', nullable: true })
  @IsOptional()
  @ValidateIf((o, v) => v !== null && v !== '')
  @Transform(({ value }) => value === '' ? null : value)
  @IsDateString({}, { message: 'joinDate phải là chuỗi ngày tháng hợp lệ theo ISO 8601' })
  joinDate?: string | null;

  @ApiPropertyOptional({ description: 'Kinh nghiệm làm việc', example: '5 năm kinh nghiệm phát triển phần mềm', nullable: true })
  @IsOptional()
  @ValidateIf((o, v) => v !== null && v !== '')
  @IsString({ message: 'workExperience phải là chuỗi' })
  @Transform(({ value }) => value === '' ? null : value)
  workExperience?: string | null;

  @ApiPropertyOptional({ description: 'Số tài khoản ngân hàng', example: '1234567890', nullable: true })
  @IsOptional()
  @ValidateIf((o, v) => v !== null && v !== '')
  @IsString({ message: 'bankAccount phải là chuỗi' })
  @Transform(({ value }) => value === '' ? null : value)
  bankAccount?: string | null;

  @ApiPropertyOptional({ description: 'Tên ngân hàng', example: 'Vietcombank', nullable: true })
  @IsOptional()
  @ValidateIf((o, v) => v !== null && v !== '')
  @IsString({ message: 'bankName phải là chuỗi' })
  @Transform(({ value }) => value === '' ? null : value)
  bankName?: string | null;

  @ApiPropertyOptional({ description: 'Mã số thuế cá nhân', example: '1234567890', nullable: true })
  @IsOptional()
  @ValidateIf((o, v) => v !== null && v !== '')
  @IsString({ message: 'taxCode phải là chuỗi' })
  @Transform(({ value }) => value === '' ? null : value)
  taxCode?: string | null;

  @ApiPropertyOptional({ description: 'Mã số bảo hiểm xã hội', example: '1234567890', nullable: true })
  @IsOptional()
  @ValidateIf((o, v) => v !== null && v !== '')
  @IsString({ message: 'insuranceCode phải là chuỗi' })
  @Transform(({ value }) => value === '' ? null : value)
  insuranceCode?: string | null;

  @ApiPropertyOptional({ description: 'Trạng thái hoạt động của tài khoản', default: true, example: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === null || value === '') return null;
    if (typeof value === 'string') {
      const lowerValue = value.toLowerCase();
      return lowerValue === 'true' ? true : lowerValue === 'false' ? false : value;
    }
    return value;
  })
  @IsBoolean({ message: 'isActive phải là boolean' })
  isActive?: boolean;
}
