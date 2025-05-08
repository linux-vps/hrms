import { BaseEntity } from 'src/common/types/base-entity.type';
import { Payroll } from './payroll.entity';
export declare class PayrollBonus extends BaseEntity {
    payroll: Payroll;
    payrollId: string;
    name: string;
    description: string;
    amount: number;
    taxable: boolean;
}
