import { BaseEntity } from 'src/common/types/base-entity.type';
import { User } from 'src/auth/entities/user.entity';
export declare class ActivityLog extends BaseEntity {
    user: User;
    userId: string;
    action: string;
    entityType: string;
    entityId: string;
    details: string;
    ipAddress: string;
    timestamp: Date;
}
