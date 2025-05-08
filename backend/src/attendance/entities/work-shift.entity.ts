import { BaseEntity } from 'src/common/types/base-entity.type';
import { WorkShiftType } from 'src/common/types/enums.type';
import { Column, Entity } from 'typeorm';

/**
 * Entity quản lý ca làm việc
 */
@Entity('work_shifts')
export class WorkShift extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: WorkShiftType,
    default: WorkShiftType.FULL_DAY,
  })
  type: WorkShiftType;

  @Column({ name: 'start_time', type: 'time' })
  startTime: string;

  @Column({ name: 'end_time', type: 'time' })
  endTime: string;

  @Column({ name: 'break_start', type: 'time', nullable: true })
  breakStart: string;

  @Column({ name: 'break_end', type: 'time', nullable: true })
  breakEnd: string;

  @Column({ default: true })
  active: boolean;
} 