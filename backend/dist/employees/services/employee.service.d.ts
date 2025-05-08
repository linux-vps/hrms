import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto, UpdateEmployeeDto, UpdateSalaryDto } from '../dtos/employee.dto';
import { Department } from 'src/departments/entities/department.entity';
import { PaginationDto, PaginatedResultDto } from 'src/common/dtos/pagination.dto';
import { User } from 'src/auth/entities/user.entity';
import { UserRole } from 'src/common/types/enums.type';
export declare class EmployeeService {
    private readonly employeeRepository;
    private readonly departmentRepository;
    private readonly userRepository;
    constructor(employeeRepository: Repository<Employee>, departmentRepository: Repository<Department>, userRepository: Repository<User>);
    findAll(paginationDto: PaginationDto, search?: string): Promise<PaginatedResultDto<Employee>>;
    findById(id: string): Promise<Employee>;
    create(createEmployeeDto: CreateEmployeeDto, createAccount?: boolean): Promise<Employee>;
    update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
    updateSalary(id: string, updateSalaryDto: UpdateSalaryDto): Promise<Employee>;
    delete(id: string): Promise<{
        id: string;
        success: boolean;
    }>;
    updateAvatar(id: string, avatar: string): Promise<Employee>;
    createUserAccountForEmployee(employeeId: string, email: string, password: string, role?: UserRole): Promise<User>;
}
