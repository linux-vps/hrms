import { BaseEntity } from 'src/common/types/base-entity.type';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Payroll } from './payroll.entity';

/**
 * Entity quản lý các khoản khấu trừ trong bảng lương
 */
@Entity('payroll_deductions')
export class PayrollDeduction extends BaseEntity {
  @ManyToOne(() => Payroll, payroll => payroll.deductions)
  @JoinColumn({ name: 'payroll_id' })
  payroll: Payroll;

  @Column({ name: 'payroll_id' })
  payrollId: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  amount: number;
} 