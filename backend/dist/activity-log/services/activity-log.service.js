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
exports.ActivityLogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const activity_log_entity_1 = require("../entities/activity-log.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const enums_type_1 = require("../../common/types/enums.type");
let ActivityLogService = class ActivityLogService {
    activityLogRepository;
    userRepository;
    constructor(activityLogRepository, userRepository) {
        this.activityLogRepository = activityLogRepository;
        this.userRepository = userRepository;
    }
    async create(data) {
        const activityLog = this.activityLogRepository.create(data);
        return await this.activityLogRepository.save(activityLog);
    }
    async findAll(userId, query) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền xem nhật ký hoạt động');
        }
        const where = {
            isActive: true
        };
        if (query.userId) {
            where.userId = query.userId;
        }
        if (query.action) {
            where.action = (0, typeorm_2.Like)(`%${query.action}%`);
        }
        if (query.entityType) {
            where.entityType = query.entityType;
        }
        if (query.entityId) {
            where.entityId = query.entityId;
        }
        if (query.fromDate && query.toDate) {
            where.timestamp = (0, typeorm_2.Between)(new Date(query.fromDate), new Date(query.toDate));
        }
        const activityLogs = await this.activityLogRepository.find({
            where,
            relations: ['user'],
            order: {
                timestamp: 'DESC',
            },
        });
        return activityLogs;
    }
    async findByUser(targetUserId, userId, query) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN && userId !== targetUserId) {
            throw new common_1.BadRequestException('Bạn không có quyền xem nhật ký hoạt động người khác');
        }
        const targetUser = await this.userRepository.findOne({
            where: { id: targetUserId },
        });
        if (!targetUser) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng cần xem nhật ký');
        }
        const where = {
            userId: targetUserId,
            isActive: true
        };
        if (query.action) {
            where.action = (0, typeorm_2.Like)(`%${query.action}%`);
        }
        if (query.entityType) {
            where.entityType = query.entityType;
        }
        if (query.fromDate && query.toDate) {
            where.timestamp = (0, typeorm_2.Between)(new Date(query.fromDate), new Date(query.toDate));
        }
        const activityLogs = await this.activityLogRepository.find({
            where,
            relations: ['user'],
            order: {
                timestamp: 'DESC',
            },
        });
        return activityLogs;
    }
    async deleteOldLogs(days, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền xóa nhật ký hoạt động');
        }
        const date = new Date();
        date.setDate(date.getDate() - days);
        const oldLogs = await this.activityLogRepository.find({
            where: {
                timestamp: (0, typeorm_2.Between)(new Date(0), date),
            },
        });
        const result = await this.activityLogRepository.softDelete({
            timestamp: (0, typeorm_2.Between)(new Date(0), date),
        });
        for (const log of oldLogs) {
            await this.activityLogRepository.update(log.id, { isActive: false });
        }
        return result.affected || 0;
    }
};
exports.ActivityLogService = ActivityLogService;
exports.ActivityLogService = ActivityLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(activity_log_entity_1.ActivityLog)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ActivityLogService);
//# sourceMappingURL=activity-log.service.js.map