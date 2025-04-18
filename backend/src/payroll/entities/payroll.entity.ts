import { BaseEntity } from 'src/common/types/base-entity.type';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';

/**
 * Entity bảng lương
 */
@Entity('payrolls')
export class Payroll extends BaseEntity {
  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @Column({ type: 'date' })
  month: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  baseSalary: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  bonus: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  deduction: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalSalary: number;

  @Column({ nullable: true })
  note: string;

  @Column({ name: 'is_paid', default: false })
  isPaid: boolean;

  @Column({ name: 'payment_date', nullable: true })
  paymentDate: Date;
} 