import { BaseEntity } from 'src/common/types/base-entity.type';
import { DepartmentRole, Gender } from 'src/common/types/enums.type';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Department } from 'src/departments/entities/department.entity';

/**
 * Entity nhân viên
 */
@Entity('employees')
export class Employee extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({ nullable: true })
  address: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @ManyToOne(() => Department, (department) => department.employees)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column({ name: 'department_id', nullable: true })
  departmentId: string;

  @Column({ nullable: true })
  position: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  salary: number;

  @Column({
    type: 'enum',
    enum: DepartmentRole,
    default: DepartmentRole.MEMBER,
  })
  role: DepartmentRole;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  hireDate: Date;

  @Column({ default: 'default.jpg' })
  avatar: string;

  @Column({ name: 'leave_days_per_month', type: 'decimal', precision: 4, scale: 1, default: 5 })
  leaveDaysPerMonth: number;

  @Column({ name: 'remaining_leave_days', type: 'decimal', precision: 5, scale: 1, default: 5 })
  remainingLeaveDays: number;

  @Column({ name: 'dependents', type: 'int', default: 0, comment: 'Số người phụ thuộc để tính thuế TNCN' })
  dependents: number;
} 