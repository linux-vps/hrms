import { BaseEntity } from 'src/common/types/base-entity.type';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

/**
 * Entity bảng tin
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

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ default: false })
  pinned: boolean;
} 