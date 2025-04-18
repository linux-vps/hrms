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

  @Column({ name: 'entity_type', nullable: true })
  entityType: string;

  @Column({ name: 'entity_id', nullable: true })
  entityId: string;

  @Column({ name: 'ip_address', nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  details: string;
} 