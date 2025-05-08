import { BaseEntity } from 'src/common/types/base-entity.type';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { PayrollAllowance } from './payroll-allowance.entity';
import { PayrollDeduction } from './payroll-deduction.entity';
import { PayrollBonus } from './payroll-bonus.entity';

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

  @Column()
  month: number;

  @Column()
  year: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  baseSalary: number;

  @Column({ name: 'working_days', type: 'decimal', precision: 5, scale: 1, default: 0 })
  workingDays: number;
  
  @Column({ name: 'standard_working_days', type: 'decimal', precision: 5, scale: 1, default: 22 })
  standardWorkingDays: number;

  @Column({ name: 'overtime_hours', type: 'decimal', precision: 5, scale: 1, default: 0 })
  overtimeHours: number;

  @Column({ name: 'overtime_pay', type: 'decimal', precision: 15, scale: 2, default: 0 })
  overtimePay: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  grossSalary: number;

  @OneToMany(() => PayrollAllowance, allowance => allowance.payroll, { cascade: true })
  allowances: PayrollAllowance[];

  @OneToMany(() => PayrollBonus, bonus => bonus.payroll, { cascade: true })
  bonuses: PayrollBonus[];

  @OneToMany(() => PayrollDeduction, deduction => deduction.payroll, { cascade: true })
  deductions: PayrollDeduction[];

  @Column({ name: 'total_allowance', type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalAllowance: number;

  @Column({ name: 'total_bonus', type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalBonus: number;

  @Column({ name: 'total_deduction', type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalDeduction: number;

  @Column({ name: 'social_insurance', type: 'decimal', precision: 15, scale: 2, default: 0 })
  socialInsurance: number;

  @Column({ name: 'health_insurance', type: 'decimal', precision: 15, scale: 2, default: 0 })
  healthInsurance: number;

  @Column({ name: 'unemployment_insurance', type: 'decimal', precision: 15, scale: 2, default: 0 })
  unemploymentInsurance: number;

  @Column({ name: 'personal_income_tax', type: 'decimal', precision: 15, scale: 2, default: 0 })
  personalIncomeTax: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  netSalary: number;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'is_paid', default: false })
  isPaid: boolean;

  @Column({ name: 'payment_date', nullable: true })
  paymentDate: Date;
} 