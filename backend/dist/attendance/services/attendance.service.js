"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendance_entity_1 = require("../entities/attendance.entity");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const enums_type_1 = require("../../common/types/enums.type");
const enums_type_2 = require("../../common/types/enums.type");
const work_shift_entity_1 = require("../entities/work-shift.entity");
let AttendanceService = class AttendanceService {
    attendanceRepository;
    employeeRepository;
    userRepository;
    workShiftRepository;
    constructor(attendanceRepository, employeeRepository, userRepository, workShiftRepository) {
        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
        this.workShiftRepository = workShiftRepository;
    }
    async create(createAttendanceDto, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền tạo bản ghi chấm công');
        }
        const employee = await this.employeeRepository.findOne({
            where: { id: createAttendanceDto.employeeId },
        });
        if (!employee) {
            throw new common_1.NotFoundException('Nhân viên không tồn tại');
        }
        const existingAttendance = await this.attendanceRepository.findOne({
            where: {
                employeeId: createAttendanceDto.employeeId,
                date: createAttendanceDto.date,
            },
        });
        if (existingAttendance) {
            throw new common_1.BadRequestException('Nhân viên đã được chấm công trong ngày này');
        }
        if (createAttendanceDto.workShiftId) {
            const workShift = await this.workShiftRepository.findOne({
                where: { id: createAttendanceDto.workShiftId },
            });
            if (!workShift) {
                throw new common_1.NotFoundException('Ca làm việc không tồn tại');
            }
            if (createAttendanceDto.checkInTime && !createAttendanceDto.isLate) {
                createAttendanceDto.isLate = this.isLate(createAttendanceDto.checkInTime, workShift.startTime);
            }
            if (createAttendanceDto.checkOutTime && !createAttendanceDto.isEarlyLeave) {
                createAttendanceDto.isEarlyLeave = this.isEarlyLeave(createAttendanceDto.checkOutTime, workShift.endTime);
            }
        }
        const attendance = this.attendanceRepository.create(createAttendanceDto);
        return await this.attendanceRepository.save(attendance);
    }
    async findAll(userId, query) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        let queryBuilder = this.attendanceRepository.createQueryBuilder('attendance')
            .leftJoinAndSelect('attendance.employee', 'employee')
            .leftJoinAndSelect('attendance.workShift', 'workShift')
            .where('attendance.isActive = :isActive', { isActive: true });
        if (user.role === enums_type_1.UserRole.EMPLOYEE) {
            const employee = await this.employeeRepository.findOne({
                where: { email: user.email },
            });
            if (!employee) {
                throw new common_1.NotFoundException('Không tìm thấy thông tin nhân viên');
            }
            queryBuilder = queryBuilder.andWhere('attendance.employeeId = :employeeId', { employeeId: employee.id });
        }
        else if (query.employeeId) {
            queryBuilder = queryBuilder.andWhere('attendance.employeeId = :employeeId', { employeeId: query.employeeId });
        }
        if (query.startDate && query.endDate) {
            queryBuilder = queryBuilder.andWhere('attendance.date BETWEEN :startDate AND :endDate', {
                startDate: query.startDate,
                endDate: query.endDate,
            });
        }
        else if (query.startDate) {
            queryBuilder = queryBuilder.andWhere('attendance.date >= :startDate', { startDate: query.startDate });
        }
        else if (query.endDate) {
            queryBuilder = queryBuilder.andWhere('attendance.date <= :endDate', { endDate: query.endDate });
        }
        if (query.workShiftId) {
            queryBuilder = queryBuilder.andWhere('attendance.workShiftId = :workShiftId', { workShiftId: query.workShiftId });
        }
        if (query.status) {
            queryBuilder = queryBuilder.andWhere('attendance.status = :status', { status: query.status });
        }
        if (query.isLate === 'true') {
            queryBuilder = queryBuilder.andWhere('attendance.isLate = true');
        }
        if (query.isEarlyLeave === 'true') {
            queryBuilder = queryBuilder.andWhere('attendance.isEarlyLeave = true');
        }
        return queryBuilder.orderBy('attendance.date', 'DESC').getMany();
    }
    async findOne(id, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        const attendance = await this.attendanceRepository.findOne({
            where: { id },
            relations: ['employee', 'workShift'],
        });
        if (!attendance) {
            throw new common_1.NotFoundException('Không tìm thấy bản ghi chấm công');
        }
        if (user.role === enums_type_1.UserRole.EMPLOYEE) {
            const employee = await this.employeeRepository.findOne({
                where: { email: user.email },
            });
            if (!employee || employee.id !== attendance.employeeId) {
                throw new common_1.BadRequestException('Bạn không có quyền xem bản ghi chấm công này');
            }
        }
        return attendance;
    }
    async update(id, updateAttendanceDto, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền cập nhật bản ghi chấm công');
        }
        const attendance = await this.findOne(id, userId);
        if (updateAttendanceDto.workShiftId) {
            const workShift = await this.workShiftRepository.findOne({
                where: { id: updateAttendanceDto.workShiftId },
            });
            if (!workShift) {
                throw new common_1.NotFoundException('Ca làm việc không tồn tại');
            }
            if (updateAttendanceDto.checkInTime) {
                updateAttendanceDto.isLate = this.isLate(updateAttendanceDto.checkInTime, workShift.startTime);
            }
            else if (attendance.checkInTime && attendance.workShiftId !== updateAttendanceDto.workShiftId) {
                updateAttendanceDto.isLate = this.isLate(attendance.checkInTime, workShift.startTime);
            }
            if (updateAttendanceDto.checkOutTime) {
                updateAttendanceDto.isEarlyLeave = this.isEarlyLeave(updateAttendanceDto.checkOutTime, workShift.endTime);
            }
            else if (attendance.checkOutTime && attendance.workShiftId !== updateAttendanceDto.workShiftId) {
                updateAttendanceDto.isEarlyLeave = this.isEarlyLeave(attendance.checkOutTime, workShift.endTime);
            }
        }
        const updatedAttendance = { ...attendance, ...updateAttendanceDto };
        return this.attendanceRepository.save(updatedAttendance);
    }
    async remove(id, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền xóa bản ghi chấm công');
        }
        const attendance = await this.findOne(id, userId);
        await this.attendanceRepository.softDelete(id);
        await this.attendanceRepository.update(id, { isActive: false });
    }
    async checkIn(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        const employee = await this.employeeRepository.findOne({
            where: { email: user.email },
        });
        if (!employee) {
            throw new common_1.NotFoundException('Không tìm thấy thông tin nhân viên');
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const existingAttendance = await this.attendanceRepository.findOne({
            where: {
                employeeId: employee.id,
                date: today,
            },
        });
        if (existingAttendance) {
            throw new common_1.BadRequestException('Bạn đã chấm công trong ngày hôm nay');
        }
        const now = new Date();
        const checkInTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const attendance = this.attendanceRepository.create({
            employeeId: employee.id,
            date: today,
            status: enums_type_2.AttendanceStatus.PRESENT,
            checkInTime,
        });
        return await this.attendanceRepository.save(attendance);
    }
    async checkOut(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        const employee = await this.employeeRepository.findOne({
            where: { email: user.email },
        });
        if (!employee) {
            throw new common_1.NotFoundException('Không tìm thấy thông tin nhân viên');
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const attendance = await this.attendanceRepository.findOne({
            where: {
                employeeId: employee.id,
                date: today,
            },
            relations: ['workShift'],
        });
        if (!attendance) {
            throw new common_1.BadRequestException('Bạn chưa check-in trong ngày hôm nay');
        }
        if (attendance.checkOutTime) {
            throw new common_1.BadRequestException('Bạn đã check-out trước đó');
        }
        const now = new Date();
        const checkOutTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        if (attendance.workShift) {
            attendance.isEarlyLeave = this.isEarlyLeave(checkOutTime, attendance.workShift.endTime);
        }
        attendance.checkOutTime = checkOutTime;
        return await this.attendanceRepository.save(attendance);
    }
    isLate(checkInTime, shiftStartTime) {
        const [checkInHour, checkInMinute] = checkInTime.split(':').map(Number);
        const [startHour, startMinute] = shiftStartTime.split(':').map(Number);
        const checkInMinutes = checkInHour * 60 + checkInMinute;
        const startMinutes = startHour * 60 + startMinute;
        return checkInMinutes > startMinutes;
    }
    isEarlyLeave(checkOutTime, shiftEndTime) {
        const [checkOutHour, checkOutMinute] = checkOutTime.split(':').map(Number);
        const [endHour, endMinute] = shiftEndTime.split(':').map(Number);
        const checkOutMinutes = checkOutHour * 60 + checkOutMinute;
        const endMinutes = endHour * 60 + endMinute;
        return checkOutMinutes < endMinutes;
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(work_shift_entity_1.WorkShift)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map