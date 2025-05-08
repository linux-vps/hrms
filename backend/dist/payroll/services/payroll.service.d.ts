import { Repository } from 'typeorm';
import { Payroll } from '../entities/payroll.entity';
import { CreatePayrollDto, UpdatePayrollDto } from '../dtos/payroll.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { User } from 'src/auth/entities/user.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Leave } from 'src/leaves/entities/leave.entity';
import { PayrollBonus } from '../entities/payroll-bonus.entity';
export declare class PayrollService {
    private readonly payrollRepository;
    private readonly employeeRepository;
    private readonly userRepository;
    private readonly attendanceRepository;
    private readonly leaveRepository;
    private readonly payrollBonusRepository;
    constructor(payrollRepository: Repository<Payroll>, employeeRepository: Repository<Employee>, userRepository: Repository<User>, attendanceRepository: Repository<Attendance>, leaveRepository: Repository<Leave>, payrollBonusRepository: Repository<PayrollBonus>);
    create(createPayrollDto: CreatePayrollDto, userId: string): Promise<Payroll>;
    findAll(userId: string, query: any): Promise<Payroll[]>;
    findOne(id: string, userId: string): Promise<Payroll>;
    update(id: string, updatePayrollDto: UpdatePayrollDto, userId: string): Promise<Payroll>;
    remove(id: string, userId: string): Promise<void>;
    generateMonthlyPayrolls(userId: string): Promise<any[]>;
    calculateAttendanceBonus(employeeId: string, month: number, year: number): Promise<number>;
    private calculateWorkingDaysInMonth;
    generatePayroll(createPayrollDto: CreatePayrollDto, userId: string): Promise<Payroll>;
}
