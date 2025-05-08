export declare class ApiResponseDto<T = any> {
    success: boolean;
    message: string;
    data?: T;
    timestamp: Date;
    constructor(success: boolean, message: string, data?: T, timestamp?: Date);
}
export declare function createSuccessResponse<T>(message: string, data?: T): ApiResponseDto<T>;
export declare function createErrorResponse(message: string): ApiResponseDto;
