import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../dtos/department.dto';
import { PaginationDto, PaginatedResultDto } from 'src/common/dtos/pagination.dto';
export declare class DepartmentService {
    private readonly departmentRepository;
    constructor(departmentRepository: Repository<Department>);
    findAll(paginationDto: PaginationDto): Promise<PaginatedResultDto<Department>>;
    findById(id: string): Promise<Department>;
    create(createDepartmentDto: CreateDepartmentDto): Promise<Department>;
    update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department>;
    delete(id: string): Promise<{
        id: string;
        success: boolean;
    }>;
}
