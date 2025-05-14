import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Comment } from '../entities/comment.entity';
import { SubTask } from '../entities/subtask.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  WAITING_REVIEW = 'waiting_review',
  COMPLETED = 'completed',
  OVERDUE = 'overdue',
  REJECTED = 'rejected'
}

@Entity()
export class Task {
  @ApiProperty({ description: 'ID duy nhất của công việc', format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Tên công việc' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Mô tả công việc', required: false })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ description: 'Trạng thái công việc', enum: TaskStatus, default: TaskStatus.PENDING })
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING
  })
  status: TaskStatus;

  @ApiProperty({ description: 'Mức độ ưu tiên (1-5)', default: 3 })
  @Column({ default: 3 })
  priority: number;

  @ApiProperty({ description: 'Ngày bắt đầu', required: false })
  @Column({ type: 'timestamp', nullable: true })
  startDate?: Date;

  @ApiProperty({ description: 'Hạn chót', required: false })
  @Column({ type: 'timestamp', nullable: true })
  dueDate?: Date;

  @ApiProperty({ description: 'Thời điểm bắt đầu thực hiện', required: false })
  @Column({ type: 'timestamp', nullable: true })
  startedAt?: Date;

  @ApiProperty({ description: 'Thời điểm nộp công việc', required: false })
  @Column({ type: 'timestamp', nullable: true })
  submittedAt?: Date;

  @ApiProperty({ description: 'Thời điểm hoàn thành', required: false })
  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date;

  @ApiProperty({ description: 'ID dự án' })
  @Column()
  projectId: string;

  @ApiProperty({ description: 'ID người giao việc' })
  @Column()
  assignerId: string;

  @ApiProperty({ description: 'ID người giám sát' })
  @Column()
  supervisorId: string;

  @ManyToOne(() => Project, project => project.tasks)
  project: Project;

  @ManyToOne(() => Employee)
  assigner: Employee;

  @ManyToOne(() => Employee)
  supervisor: Employee;

  @ManyToMany(() => Employee)
  @JoinTable({
    name: 'task_assignee',
    joinColumn: { name: 'taskId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'employeeId', referencedColumnName: 'id' }
  })
  assignees: Employee[];

  @OneToMany(() => SubTask, subtask => subtask.task)
  subtasks: SubTask[];

  @OneToMany(() => Comment, comment => comment.task)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 