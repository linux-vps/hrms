import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Task } from '../../task/entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project {
  @ApiProperty({ description: 'ID duy nhất của dự án', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Tên dự án' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Mô tả dự án', required: false })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ description: 'Ngày bắt đầu dự án', required: false })
  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @ApiProperty({ description: 'Ngày kết thúc dự án', required: false })
  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @ApiProperty({ description: 'Trạng thái dự án: draft, active, completed, archived' })
  @Column({ default: 'draft' })
  status: string;

  @ApiProperty({ description: 'ID phòng ban của dự án' })
  @Column()
  departmentId: string;

  @ApiProperty({ description: 'ID người quản lý dự án' })
  @Column()
  managerId: string;

  @ManyToOne(() => Department)
  department: Department;

  @ManyToOne(() => Employee)
  manager: Employee;

  @ManyToMany(() => Employee)
  @JoinTable({
    name: 'project_employee',
    joinColumn: { name: 'projectId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'employeeId', referencedColumnName: 'id' }
  })
  members: Employee[];

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 