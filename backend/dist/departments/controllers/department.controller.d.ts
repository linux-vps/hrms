import { DepartmentService } from '../services/department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../dtos/department.dto';
import { PaginationDto, PaginatedResultDto } from 'src/common/dtos/pagination.dto';
import { Department } from '../entities/department.entity';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    findAll(paginationDto: PaginationDto): Promise<PaginatedResultDto<Department>>;
    findOne(id: string): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<Department>>;
    create(createDepartmentDto: CreateDepartmentDto): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<Department>>;
    update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<Department>>;
    delete(id: string): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<{
        id: string;
        success: boolean;
    }>>;
}
