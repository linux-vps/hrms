import { BaseEntity } from 'src/common/types/base-entity.type';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Payroll } from './payroll.entity';

/**
 * Entity quản lý các khoản thưởng trong bảng lương
 */
@Entity('payroll_bonuses')
export class PayrollBonus extends BaseEntity {
  @ManyToOne(() => Payroll, payroll => payroll.bonuses)
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