export declare class CreateFeedDto {
    title: string;
    content: string;
    departmentId?: string;
    isImportant?: boolean;
}
export declare class UpdateFeedDto {
    title?: string;
    content?: string;
    departmentId?: string;
    isImportant?: boolean;
}
export declare class FeedResponseDto {
    id: string;
    title: string;
    content: string;
    createdById: string;
    createdByName: string;
    departmentId?: string;
    departmentName?: string;
    timestamp: Date;
    isImportant: boolean;
    createdAt: Date;
    updatedAt: Date;
}
