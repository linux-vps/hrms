import { BaseEntity } from 'src/common/types/base-entity.type';
import { AttendanceStatus } from 'src/common/types/enums.type';
import { Employee } from 'src/employees/entities/employee.entity';
import { WorkShift } from './work-shift.entity';
export declare class Attendance extends BaseEntity {
    employee: Employee;
    employeeId: string;
    date: Date;
    status: AttendanceStatus;
    note: string;
    workShift: WorkShift;
    workShiftId: string;
    checkInTime: string;
    checkOutTime: string;
    isLate: boolean;
    isEarlyLeave: boolean;
}
