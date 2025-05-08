import { BaseEntity } from 'src/common/types/base-entity.type';
import { LeaveStatus, LeaveType } from 'src/common/types/enums.type';
import { Employee } from 'src/employees/entities/employee.entity';
import { User } from 'src/auth/entities/user.entity';
export declare class Leave extends BaseEntity {
    employee: Employee;
    employeeId: string;
    type: LeaveType;
    startDate: Date;
    endDate: Date;
    days: number;
    reason: string;
    status: LeaveStatus;
    approvedBy: User;
    approvedById: string;
    approvalDate: Date;
}
