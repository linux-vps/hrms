import { BaseEntity } from 'src/common/types/base-entity.type';
import { Column, Entity } from 'typeorm';

/**
 * Entity cấu hình các tham số tính lương
 */
@Entity('payroll_configs')
export class PayrollConfig extends BaseEntity {
  @Column({ unique: true })
  key: string;
  
  @Column()
  value: string;
  
  @Column({ type: 'text', nullable: true })
  description: string;
} 