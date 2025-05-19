import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { Timekeeping } from '../../timekeeping/entities/timekeeping.entity';
import { Role } from '../../../common/enums/role.enum';
import { Position } from '../../../common/enums/position.enum';
import { Education } from '../../../common/enums/education.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Employee {
  @ApiProperty({ description: 'ID duy nhất của nhân viên', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiPropertyOptional({ description: 'Họ tên đầy đủ của nhân viên', example: 'Nguyễn Văn A' })
  @Column({ nullable: true })
  fullName?: string;

  @ApiProperty({ description: 'Mật khẩu đã được mã hóa của nhân viên', example: 'Password123!' })
  @Column({ nullable: false })
  password: string;

  @ApiPropertyOptional({ description: 'Đường dẫn đến ảnh đại diện', example: 'https://example.com/avatar.jpg' })
  @Column({ nullable: true })
  avatar?: string;

  @ApiPropertyOptional({ description: 'Số điện thoại liên hệ', example: '+84987654321' })
  @Column({ nullable: true })
  phoneNumber?: string;

  @ApiProperty({ description: 'Địa chỉ email (dùng để đăng nhập)', example: 'example@email.com' })
  @Column({ nullable: false })
  email: string;

  @ApiPropertyOptional({ description: 'Ngày sinh', type: 'string', format: 'date', example: '1990-01-01' })
  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @ApiProperty({ description: 'Trạng thái hoạt động của tài khoản', default: true, example: true })
  @Column({ default: true })
  isActive?: boolean;

  @ApiProperty({ 
    description: 'Vai trò của nhân viên trong hệ thống',
    enum: Role,
    enumName: 'Role',
    default: Role.USER,
    example: Role.USER
  })
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
    nullable: false
  })
  role: Role;

  @ApiPropertyOptional({ description: 'ID của phòng ban', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174001' })
  @Column({ nullable: true })
  departmentId?: string;

  @ApiPropertyOptional({ description: 'Thông tin phòng ban', type: () => Department })
  @ManyToOne(() => Department, (department) => department.employees, { nullable: true })
  @JoinColumn({ name: 'departmentId' })
  department?: Department;

  @ApiPropertyOptional({ description: 'Danh sách chấm công', type: [Timekeeping] })
  @OneToMany(() => Timekeeping, (timekeeping) => timekeeping.employee, { nullable: true })
  timekeepings?: Timekeeping[];

  // Thông tin mở rộng
  @ApiPropertyOptional({ description: 'Địa chỉ liên hệ', example: 'Số 1, Đường ABC, Quận XYZ, TP. Hồ Chí Minh' })
  @Column({ nullable: true })
  address?: string;

  @ApiPropertyOptional({ description: 'Số CMND/CCCD', example: '123456789012' })
  @Column({ nullable: true })
  identityCard?: string;

  @ApiPropertyOptional({ description: 'Ngày vào làm', type: 'string', format: 'date', example: '2022-01-01' })
  @Column({ type: 'date', nullable: true })
  joinDate?: Date;

  @ApiPropertyOptional({ 
    description: 'Chức vụ',
    enum: Position,
    enumName: 'Position',
    example: Position.SENIOR
  })
  @Column({
    type: 'enum',
    enum: Position,
    nullable: true
  })
  position?: Position;

  @ApiPropertyOptional({ 
    description: 'Trình độ học vấn',
    enum: Education,
    enumName: 'Education',
    example: Education.BACHELOR
  })
  @Column({
    type: 'enum',
    enum: Education,
    nullable: true
  })
  education?: Education;

  @ApiPropertyOptional({ description: 'Kinh nghiệm làm việc', example: '5 năm kinh nghiệm phát triển phần mềm' })
  @Column({ nullable: true, type: 'text' })
  workExperience?: string;

  @ApiPropertyOptional({ description: 'Lương cơ bản', type: 'number', example: 10000000 })
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  baseSalary?: number;

  @ApiPropertyOptional({ description: 'Số tài khoản ngân hàng', example: '1234567890' })
  @Column({ nullable: true })
  bankAccount?: string;

  @ApiPropertyOptional({ description: 'Tên ngân hàng', example: 'Vietcombank' })
  @Column({ nullable: true })
  bankName?: string;

  @ApiPropertyOptional({ description: 'Mã số thuế cá nhân', example: '1234567890' })
  @Column({ nullable: true })
  taxCode?: string;

  @ApiPropertyOptional({ description: 'Mã số bảo hiểm xã hội', example: '1234567890' })
  @Column({ nullable: true })
  insuranceCode?: string;
}
