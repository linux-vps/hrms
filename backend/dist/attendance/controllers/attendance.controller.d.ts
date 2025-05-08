import { AttendanceService } from '../services/attendance.service';
import { CreateAttendanceDto, UpdateAttendanceDto } from '../dtos/attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(createAttendanceDto: CreateAttendanceDto, req: any): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/attendance.entity").Attendance>>;
    findAll(query: any, req: any): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/attendance.entity").Attendance[]>>;
    findOne(id: string, req: any): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/attendance.entity").Attendance>>;
    update(id: string, updateAttendanceDto: UpdateAttendanceDto, req: any): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/attendance.entity").Attendance>>;
    remove(id: string, req: any): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<{
        id: string;
    }>>;
    checkIn(req: any): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/attendance.entity").Attendance>>;
    checkOut(req: any): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/attendance.entity").Attendance>>;
}
