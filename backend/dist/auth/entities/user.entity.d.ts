import { BaseEntity } from 'src/common/types/base-entity.type';
import { UserRole } from 'src/common/types/enums.type';
import { Employee } from 'src/employees/entities/employee.entity';
export declare class User extends BaseEntity {
    email: string;
    password: string;
    role: UserRole;
    employee: Employee;
    employeeId: string;
}
