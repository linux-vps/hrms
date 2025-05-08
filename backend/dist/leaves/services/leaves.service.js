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
exports.LeavesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const leave_entity_1 = require("../entities/leave.entity");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const enums_type_1 = require("../../common/types/enums.type");
const enums_type_2 = require("../../common/types/enums.type");
let LeavesService = class LeavesService {
    leaveRepository;
    employeeRepository;
    userRepository;
    constructor(leaveRepository, employeeRepository, userRepository) {
        this.leaveRepository = leaveRepository;
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
    }
    async create(createLeaveDto, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền tạo yêu cầu nghỉ phép');
        }
        const employee = await this.employeeRepository.findOne({
            where: { id: createLeaveDto.employeeId },
        });
        if (!employee) {
            throw new common_1.NotFoundException('Nhân viên không tồn tại');
        }
        if (employee.remainingLeaveDays < createLeaveDto.days) {
            throw new common_1.BadRequestException('Số ngày nghỉ còn lại không đủ');
        }
        const overlappingLeave = await this.leaveRepository.findOne({
            where: [
                {
                    employeeId: createLeaveDto.employeeId,
                    startDate: (0, typeorm_2.Between)(createLeaveDto.startDate, createLeaveDto.endDate),
                    status: enums_type_2.LeaveStatus.APPROVED,
                },
                {
                    employeeId: createLeaveDto.employeeId,
                    endDate: (0, typeorm_2.Between)(createLeaveDto.startDate, createLeaveDto.endDate),
                    status: enums_type_2.LeaveStatus.APPROVED,
                },
            ],
        });
        if (overlappingLeave) {
            throw new common_1.BadRequestException('Đã có yêu cầu nghỉ phép trong khoảng thời gian này');
        }
        const leave = this.leaveRepository.create(createLeaveDto);
        return await this.leaveRepository.save(leave);
    }
    async findAll(userId, query) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        const where = {
            isActive: true
        };
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            const employee = await this.employeeRepository.findOne({
                where: { email: user.email },
            });
            if (!employee) {
                throw new common_1.NotFoundException('Không tìm thấy thông tin nhân viên');
            }
            where.employeeId = employee.id;
        }
        if (query.startDate && query.endDate) {
            where.startDate = (0, typeorm_2.Between)(new Date(query.startDate), new Date(query.endDate));
        }
        if (query.status) {
            where.status = query.status;
        }
        if (query.type) {
            where.type = query.type;
        }
        if (query.employeeName) {
            where.employee = {
                firstName: (0, typeorm_2.Like)(`%${query.employeeName}%`),
            };
        }
        const leaves = await this.leaveRepository.find({
            where,
            relations: ['employee', 'approvedBy'],
            order: {
                createdAt: 'DESC',
            },
        });
        return leaves;
    }
    async findOne(id, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        const leave = await this.leaveRepository.findOne({
            where: { id },
            relations: ['employee', 'approvedBy'],
        });
        if (!leave) {
            throw new common_1.NotFoundException('Không tìm thấy yêu cầu nghỉ phép');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            const employee = await this.employeeRepository.findOne({
                where: { email: user.email },
            });
            if (!employee || employee.id !== leave.employeeId) {
                throw new common_1.BadRequestException('Bạn không có quyền xem yêu cầu nghỉ phép này');
            }
        }
        return leave;
    }
    async update(id, updateLeaveDto, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền cập nhật yêu cầu nghỉ phép');
        }
        const leave = await this.leaveRepository.findOne({
            where: { id },
            relations: ['employee'],
        });
        if (!leave) {
            throw new common_1.NotFoundException('Không tìm thấy yêu cầu nghỉ phép');
        }
        if (leave.status !== enums_type_2.LeaveStatus.PENDING) {
            throw new common_1.BadRequestException('Không thể cập nhật yêu cầu nghỉ phép đã được duyệt hoặc từ chối');
        }
        if (updateLeaveDto.days && leave.employee.remainingLeaveDays < updateLeaveDto.days) {
            throw new common_1.BadRequestException('Số ngày nghỉ còn lại không đủ');
        }
        Object.assign(leave, updateLeaveDto);
        return await this.leaveRepository.save(leave);
    }
    async remove(id, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền xóa yêu cầu nghỉ phép');
        }
        const leave = await this.leaveRepository.findOne({
            where: { id },
        });
        if (!leave) {
            throw new common_1.NotFoundException('Không tìm thấy yêu cầu nghỉ phép');
        }
        if (leave.status !== enums_type_2.LeaveStatus.PENDING) {
            throw new common_1.BadRequestException('Không thể xóa yêu cầu nghỉ phép đã được duyệt hoặc từ chối');
        }
        await this.leaveRepository.softDelete(id);
        await this.leaveRepository.update(id, { isActive: false });
    }
    async approve(id, approveLeaveDto, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền duyệt yêu cầu nghỉ phép');
        }
        const leave = await this.leaveRepository.findOne({
            where: { id },
            relations: ['employee'],
        });
        if (!leave) {
            throw new common_1.NotFoundException('Không tìm thấy yêu cầu nghỉ phép');
        }
        if (leave.status !== enums_type_2.LeaveStatus.PENDING) {
            throw new common_1.BadRequestException('Yêu cầu nghỉ phép đã được duyệt hoặc từ chối');
        }
        leave.status = approveLeaveDto.status;
        leave.approvedById = userId;
        leave.approvalDate = new Date();
        if (approveLeaveDto.status === enums_type_2.LeaveStatus.APPROVED) {
            leave.employee.remainingLeaveDays -= leave.days;
            await this.employeeRepository.save(leave.employee);
        }
        return await this.leaveRepository.save(leave);
    }
};
exports.LeavesService = LeavesService;
exports.LeavesService = LeavesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(leave_entity_1.Leave)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LeavesService);
//# sourceMappingURL=leaves.service.js.map