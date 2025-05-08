export declare class ActivityLogResponseDto {
    id: string;
    userId: string;
    userName: string;
    action: string;
    entityType?: string;
    entityId?: string;
    details?: string;
    ipAddress?: string;
    timestamp: Date;
}
export declare class ActivityLogQueryDto {
    userId?: string;
    action?: string;
    entityType?: string;
    entityId?: string;
    fromDate?: Date;
    toDate?: Date;
}
