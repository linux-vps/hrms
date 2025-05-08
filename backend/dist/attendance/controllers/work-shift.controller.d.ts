import { WorkShiftService } from '../services/work-shift.service';
import { CreateWorkShiftDto, UpdateWorkShiftDto } from '../dtos/work-shift.dto';
export declare class WorkShiftController {
    private readonly workShiftService;
    constructor(workShiftService: WorkShiftService);
    create(createWorkShiftDto: CreateWorkShiftDto): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/work-shift.entity").WorkShift>>;
    findAll(active?: string): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/work-shift.entity").WorkShift[]>>;
    findOne(id: string): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/work-shift.entity").WorkShift>>;
    update(id: string, updateWorkShiftDto: UpdateWorkShiftDto): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/work-shift.entity").WorkShift>>;
    remove(id: string): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<{
        id: string;
        success: boolean;
    }>>;
}
