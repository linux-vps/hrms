import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Department {
  @ApiProperty({ description: 'ID duy nhất của phòng ban', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Tên phòng ban', example: 'Phòng Kỹ thuật' })
  @Column()
  departmentName: string;

  @ApiPropertyOptional({ description: 'Mô tả về phòng ban', example: 'Phụ trách các vấn đề kỹ thuật và phát triển sản phẩm' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'Trạng thái hoạt động của phòng ban', default: true, example: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiPropertyOptional({ description: 'Danh sách nhân viên thuộc phòng ban', type: [Employee] })
  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}
