import { ActivityLogService } from '../services/activity-log.service';
import { ActivityLogQueryDto } from '../dtos/activity-log.dto';
import { Request } from 'express';
export declare class ActivityLogController {
    private readonly activityLogService;
    constructor(activityLogService: ActivityLogService);
    findAll(req: Request, query: ActivityLogQueryDto): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/activity-log.entity").ActivityLog[]>>;
    findByUser(userId: string, req: Request, query: ActivityLogQueryDto): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/activity-log.entity").ActivityLog[]>>;
    deleteOldLogs(days: number, req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<unknown>>;
}
