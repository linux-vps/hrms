import { BaseEntity } from 'src/common/types/base-entity.type';
import { WorkShiftType } from 'src/common/types/enums.type';
export declare class WorkShift extends BaseEntity {
    name: string;
    description: string;
    type: WorkShiftType;
    startTime: string;
    endTime: string;
    breakStart: string;
    breakEnd: string;
    active: boolean;
}
