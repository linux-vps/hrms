import { BaseEntity } from 'src/common/types/base-entity.type';
import { DepartmentRole, Gender } from 'src/common/types/enums.type';
import { Department } from 'src/departments/entities/department.entity';
export declare class Employee extends BaseEntity {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: Gender;
    address: string;
    email: string;
    phone: string;
    department: Department;
    departmentId: string;
    position: string;
    salary: number;
    role: DepartmentRole;
    hireDate: Date;
    avatar: string;
    leaveDaysPerMonth: number;
    remainingLeaveDays: number;
}
