import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Task } from './task.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class SubTask {
  @ApiProperty({ description: 'ID duy nhất của công việc con', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nội dung công việc con' })
  @Column()
  content: string;

  @ApiProperty({ description: 'Đã hoàn thành hay chưa', default: false })
  @Column({ default: false })
  completed: boolean;

  @ApiProperty({ description: 'ID công việc chính' })
  @Column()
  taskId: string;

  @ManyToOne(() => Task, task => task.subtasks)
  task: Task;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 