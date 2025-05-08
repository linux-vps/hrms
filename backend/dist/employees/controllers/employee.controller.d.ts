import { EmployeeService } from '../services/employee.service';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto, UpdateEmployeeDto, UpdateSalaryDto } from '../dtos/employee.dto';
import { PaginationDto, PaginatedResultDto } from 'src/common/dtos/pagination.dto';
declare global {
    namespace Express {
        namespace Multer {
            interface File {
                fieldname: string;
                originalname: string;
                encoding: string;
                mimetype: string;
                size: number;
                destination: string;
                filename: string;
                path: string;
                buffer: Buffer;
            }
        }
    }
}
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    findAll(paginationDto: PaginationDto, search?: string): Promise<PaginatedResultDto<Employee>>;
    findById(id: string): Promise<Employee>;
    create(createEmployeeDto: CreateEmployeeDto, createAccount?: boolean): Promise<Employee>;
    update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee>;
    updateSalary(id: string, updateSalaryDto: UpdateSalaryDto): Promise<Employee>;
    delete(id: string): Promise<{
        id: string;
        success: boolean;
    }>;
    uploadAvatar(id: string, file: Express.Multer.File): Promise<Employee>;
}
