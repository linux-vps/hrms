import { BaseEntity } from 'src/common/types/base-entity.type';
import { LeaveStatus, LeaveType } from 'src/common/types/enums.type';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';

/**
 * Entity nghỉ phép
 */
@Entity('leaves')
export class Leave extends BaseEntity {
  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @Column({
    type: 'enum',
    enum: LeaveType,
    default: LeaveType.ANNUAL,
  })
  type: LeaveType;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'decimal', precision: 3, scale: 1 })
  days: number;

  @Column()
  reason: string;

  @Column({
    type: 'enum',
    enum: LeaveStatus,
    default: LeaveStatus.PENDING,
  })
  status: LeaveStatus;

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approvedBy: Employee;

  @Column({ name: 'approved_by', nullable: true })
  approvedById: string;

  @Column({ name: 'approval_date', nullable: true })
  approvalDate: Date;
} 