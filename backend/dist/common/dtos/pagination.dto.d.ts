export declare class PaginationDto {
    page: number;
    limit: number;
    offset(): number;
}
export declare class PaginatedResultDto<T> {
    data: T[];
    totalPages: number;
    totalItems: number;
    currentPage: number;
    constructor(data: T[], totalItems: number, pagination: PaginationDto);
}
