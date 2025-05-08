import { BaseEntity } from 'src/common/types/base-entity.type';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';
import { User } from 'src/auth/entities/user.entity';

/**
 * Entity lưu lịch sử thay đổi lương
 */
@Entity('salary_history')
export class SalaryHistory extends BaseEntity {
  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'employee_id' })
  employeeId: string;
  
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  previousSalary: number;
  
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  newSalary: number;
  
  @Column({ type: 'date' })
  effectiveDate: Date;
  
  @Column({ type: 'text', nullable: true })
  reason: string;
  
  @ManyToOne(() => User)
  @JoinColumn({ name: 'changed_by' })
  changedBy: User;
  
  @Column({ name: 'changed_by' })
  changedById: string;
} 