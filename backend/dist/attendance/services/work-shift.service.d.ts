import { Repository } from 'typeorm';
import { WorkShift } from '../entities/work-shift.entity';
import { CreateWorkShiftDto, UpdateWorkShiftDto } from '../dtos/work-shift.dto';
export declare class WorkShiftService {
    private readonly workShiftRepository;
    constructor(workShiftRepository: Repository<WorkShift>);
    create(createWorkShiftDto: CreateWorkShiftDto): Promise<WorkShift>;
    findAll(active?: boolean): Promise<WorkShift[]>;
    findOne(id: string): Promise<WorkShift>;
    update(id: string, updateWorkShiftDto: UpdateWorkShiftDto): Promise<WorkShift>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
