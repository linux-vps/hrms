import { BaseEntity } from 'src/common/types/base-entity.type';
import { Employee } from 'src/employees/entities/employee.entity';
export declare class Department extends BaseEntity {
    name: string;
    description: string;
    employees: Employee[];
}
