import { LeavesService } from '../services/leaves.service';
import { CreateLeaveDto, UpdateLeaveDto, ApproveLeaveDto } from '../dtos/leaves.dto';
import { Request } from 'express';
export declare class LeavesController {
    private readonly leavesService;
    constructor(leavesService: LeavesService);
    create(createLeaveDto: CreateLeaveDto, req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/leave.entity").Leave>>;
    findAll(req: Request, query: any): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/leave.entity").Leave[]>>;
    findOne(id: string, req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/leave.entity").Leave>>;
    update(id: string, updateLeaveDto: UpdateLeaveDto, req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/leave.entity").Leave>>;
    remove(id: string, req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<unknown>>;
    approve(id: string, approveLeaveDto: ApproveLeaveDto, req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/leave.entity").Leave>>;
}
