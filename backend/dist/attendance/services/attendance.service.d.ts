import { Repository } from 'typeorm';
import { Attendance } from '../entities/attendance.entity';
import { CreateAttendanceDto, UpdateAttendanceDto } from '../dtos/attendance.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { User } from 'src/auth/entities/user.entity';
import { WorkShift } from '../entities/work-shift.entity';
export declare class AttendanceService {
    private readonly attendanceRepository;
    private readonly employeeRepository;
    private readonly userRepository;
    private readonly workShiftRepository;
    constructor(attendanceRepository: Repository<Attendance>, employeeRepository: Repository<Employee>, userRepository: Repository<User>, workShiftRepository: Repository<WorkShift>);
    create(createAttendanceDto: CreateAttendanceDto, userId: string): Promise<Attendance>;
    findAll(userId: string, query: any): Promise<Attendance[]>;
    findOne(id: string, userId: string): Promise<Attendance>;
    update(id: string, updateAttendanceDto: UpdateAttendanceDto, userId: string): Promise<Attendance>;
    remove(id: string, userId: string): Promise<void>;
    checkIn(userId: string): Promise<Attendance>;
    checkOut(userId: string): Promise<Attendance>;
    private isLate;
    private isEarlyLeave;
}
