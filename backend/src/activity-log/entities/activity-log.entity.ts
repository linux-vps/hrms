import { BaseEntity } from 'src/common/types/base-entity.type';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

/**
 * Entity nhật ký hoạt động
 */
@Entity('activity_logs')
export class ActivityLog extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  action: string;

  @Column({ nullable: true })
  entityType: string;

  @Column({ nullable: true })
  entityId: string;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ type: 'inet', nullable: true })
  ipAddress: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
} 