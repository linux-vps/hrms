import { BaseEntity } from 'src/common/types/base-entity.type';
import { AttendanceStatus } from 'src/common/types/enums.type';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { WorkShift } from './work-shift.entity';

/**
 * Entity chấm công
 */
@Entity('attendances')
export class Attendance extends BaseEntity {
  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.PRESENT,
  })
  status: AttendanceStatus;

  @Column({ nullable: true })
  note: string;
  
  @ManyToOne(() => WorkShift, { nullable: true })
  @JoinColumn({ name: 'work_shift_id' })
  workShift: WorkShift;

  @Column({ name: 'work_shift_id', nullable: true })
  workShiftId: string;

  @Column({ name: 'check_in_time', type: 'time', nullable: true })
  checkInTime: string;

  @Column({ name: 'check_out_time', type: 'time', nullable: true })
  checkOutTime: string;

  @Column({ name: 'is_late', default: false })
  isLate: boolean;

  @Column({ name: 'is_early_leave', default: false })
  isEarlyLeave: boolean;
} 