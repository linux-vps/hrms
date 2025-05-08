import { AttendanceStatus } from 'src/common/types/enums.type';
export declare class CreateAttendanceDto {
    employeeId: string;
    date: Date;
    status?: AttendanceStatus;
    note?: string;
    workShiftId?: string;
    checkInTime?: string;
    checkOutTime?: string;
    isLate?: boolean;
    isEarlyLeave?: boolean;
}
export declare class UpdateAttendanceDto {
    status?: AttendanceStatus;
    note?: string;
    workShiftId?: string;
    checkInTime?: string;
    checkOutTime?: string;
    isLate?: boolean;
    isEarlyLeave?: boolean;
}
export declare class AttendanceResponseDto {
    id: string;
    employeeId: string;
    date: Date;
    status: AttendanceStatus;
    note: string;
    workShiftId: string;
    checkInTime: string;
    checkOutTime: string;
    isLate: boolean;
    isEarlyLeave: boolean;
    createdAt: Date;
    updatedAt: Date;
}
