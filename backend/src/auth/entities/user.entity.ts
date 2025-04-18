import { BaseEntity } from 'src/common/types/base-entity.type';
import { UserRole } from 'src/common/types/enums.type';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { Exclude } from 'class-transformer';

/**
 * Entity người dùng cho hệ thống xác thực
 */
@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude() // Loại trừ khi transform thành JSON
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
  role: UserRole;

  @OneToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'employee_id', nullable: true })
  employeeId: string;
} 