import { BaseEntity } from 'src/common/types/base-entity.type';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Department } from 'src/departments/entities/department.entity';
import { User } from 'src/auth/entities/user.entity';

/**
 * Entity thông báo (Feed)
 */
@Entity('feeds')
export class Feed extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @Column({ name: 'created_by' })
  createdById: string;

  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column({ name: 'department_id', nullable: true })
  departmentId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ default: false })
  isImportant: boolean;
} 