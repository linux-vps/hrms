import { Repository } from 'typeorm';
import { ActivityLog } from '../entities/activity-log.entity';
import { User } from 'src/auth/entities/user.entity';
export declare class ActivityLogService {
    private readonly activityLogRepository;
    private readonly userRepository;
    constructor(activityLogRepository: Repository<ActivityLog>, userRepository: Repository<User>);
    create(data: Partial<ActivityLog>): Promise<ActivityLog>;
    findAll(userId: string, query: any): Promise<ActivityLog[]>;
    findByUser(targetUserId: string, userId: string, query: any): Promise<ActivityLog[]>;
    deleteOldLogs(days: number, userId: string): Promise<number>;
}
