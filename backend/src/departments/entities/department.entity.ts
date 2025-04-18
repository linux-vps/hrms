import { BaseEntity } from 'src/common/types/base-entity.type';
import { Column, Entity, OneToMany } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';

/**
 * Entity phòng ban
 */
@Entity('departments')
export class Department extends BaseEntity {

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
} 