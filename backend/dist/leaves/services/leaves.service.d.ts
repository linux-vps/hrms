import { Repository } from 'typeorm';
import { Leave } from '../entities/leave.entity';
import { CreateLeaveDto, UpdateLeaveDto, ApproveLeaveDto } from '../dtos/leaves.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { User } from 'src/auth/entities/user.entity';
export declare class LeavesService {
    private readonly leaveRepository;
    private readonly employeeRepository;
    private readonly userRepository;
    constructor(leaveRepository: Repository<Leave>, employeeRepository: Repository<Employee>, userRepository: Repository<User>);
    create(createLeaveDto: CreateLeaveDto, userId: string): Promise<Leave>;
    findAll(userId: string, query: any): Promise<Leave[]>;
    findOne(id: string, userId: string): Promise<Leave>;
    update(id: string, updateLeaveDto: UpdateLeaveDto, userId: string): Promise<Leave>;
    remove(id: string, userId: string): Promise<void>;
    approve(id: string, approveLeaveDto: ApproveLeaveDto, userId: string): Promise<Leave>;
}
