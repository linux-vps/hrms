import { BaseEntity } from 'src/common/types/base-entity.type';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Payroll } from './payroll.entity';

/**
 * Entity quản lý các khoản phụ cấp trong bảng lương
 */
@Entity('payroll_allowances')
export class PayrollAllowance extends BaseEntity {
  @ManyToOne(() => Payroll, payroll => payroll.allowances)
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

  @Column({ default: true })
  taxable: boolean;
} 