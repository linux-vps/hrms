import { DepartmentRole, Gender } from 'src/common/types/enums.type';
export declare class CreateEmployeeDto {
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    gender?: Gender;
    address?: string;
    email?: string;
    phone?: string;
    departmentId?: string;
    position?: string;
    role?: DepartmentRole;
    salary?: number;
    hireDate?: string;
    leaveDaysPerMonth?: number;
}
declare const UpdateEmployeeDto_base: import("@nestjs/common").Type<Partial<CreateEmployeeDto>>;
export declare class UpdateEmployeeDto extends UpdateEmployeeDto_base {
    remainingLeaveDays?: number;
}
export declare class UpdateSalaryDto {
    salary: number;
}
export {};
