import { LeaveStatus, LeaveType } from 'src/common/types/enums.type';
export declare class CreateLeaveDto {
    employeeId: string;
    type: LeaveType;
    startDate: Date;
    endDate: Date;
    days: number;
    reason: string;
}
export declare class UpdateLeaveDto {
    type?: LeaveType;
    startDate?: Date;
    endDate?: Date;
    days?: number;
    reason?: string;
}
export declare class ApproveLeaveDto {
    status: LeaveStatus;
    note?: string;
}
export declare class LeaveResponseDto {
    id: string;
    employeeId: string;
    employeeName: string;
    type: LeaveType;
    startDate: Date;
    endDate: Date;
    days: number;
    reason: string;
    status: LeaveStatus;
    approvedById?: string;
    approvedByName?: string;
    approvalDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}
