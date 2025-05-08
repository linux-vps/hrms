import { FeedService } from '../services/feed.service';
import { CreateFeedDto, UpdateFeedDto } from '../dtos/feed.dto';
import { Request } from 'express';
export declare class FeedController {
    private readonly feedService;
    constructor(feedService: FeedService);
    create(createFeedDto: CreateFeedDto, req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/feed.entity").Feed>>;
    findAll(req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/feed.entity").Feed[]>>;
    findByDepartment(departmentId: string, req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/feed.entity").Feed[]>>;
    findOne(id: string, req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/feed.entity").Feed>>;
    update(id: string, updateFeedDto: UpdateFeedDto, req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/feed.entity").Feed>>;
    remove(id: string, req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<unknown>>;
}
