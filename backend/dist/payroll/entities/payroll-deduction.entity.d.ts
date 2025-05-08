import { BaseEntity } from 'src/common/types/base-entity.type';
import { Payroll } from './payroll.entity';
export declare class PayrollDeduction extends BaseEntity {
    payroll: Payroll;
    payrollId: string;
    name: string;
    description: string;
    amount: number;
}
