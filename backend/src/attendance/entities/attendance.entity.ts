import { BaseEntity } from 'src/common/types/base-entity.type';
import { AttendanceStatus } from 'src/common/types/enums.type';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';

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
} 