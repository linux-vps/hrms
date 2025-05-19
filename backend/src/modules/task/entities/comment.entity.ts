import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Task } from './task.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Comment {
  @ApiProperty({ description: 'ID duy nhất của bình luận', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nội dung bình luận' })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({ description: 'Đánh dấu là tóm tắt công việc', default: false })
  @Column({ default: false })
  isSummary: boolean;

  @ApiProperty({ description: 'ID công việc' })
  @Column()
  taskId: string;

  @ApiProperty({ description: 'ID nhân viên tạo bình luận' })
  @Column()
  employeeId: string;

  @ManyToOne(() => Task, task => task.comments)
  task: Task;

  @ManyToOne(() => Employee)
  employee: Employee;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 