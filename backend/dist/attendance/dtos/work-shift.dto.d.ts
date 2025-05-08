import { WorkShiftType } from 'src/common/types/enums.type';
export declare class CreateWorkShiftDto {
    name: string;
    description?: string;
    type?: WorkShiftType;
    startTime: string;
    endTime: string;
    breakStart?: string;
    breakEnd?: string;
    active?: boolean;
}
export declare class UpdateWorkShiftDto {
    name?: string;
    description?: string;
    type?: WorkShiftType;
    startTime?: string;
    endTime?: string;
    breakStart?: string;
    breakEnd?: string;
    active?: boolean;
}
export declare class WorkShiftResponseDto {
    id: string;
    name: string;
    description?: string;
    type: WorkShiftType;
    startTime: string;
    endTime: string;
    breakStart?: string;
    breakEnd?: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
