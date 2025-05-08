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
exports.ActivityLogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const activity_log_service_1 = require("../services/activity-log.service");
const activity_log_dto_1 = require("../dtos/activity-log.dto");
const api_response_dto_1 = require("../../common/dtos/api-response.dto");
let ActivityLogController = class ActivityLogController {
    activityLogService;
    constructor(activityLogService) {
        this.activityLogService = activityLogService;
    }
    async findAll(req, query) {
        const userId = req.user.id;
        const activityLogs = await this.activityLogService.findAll(userId, query);
        return (0, api_response_dto_1.createSuccessResponse)('Lấy danh sách nhật ký hoạt động thành công', activityLogs);
    }
    async findByUser(userId, req, query) {
        const requestUserId = req.user.id;
        const activityLogs = await this.activityLogService.findByUser(userId, requestUserId, query);
        return (0, api_response_dto_1.createSuccessResponse)('Lấy danh sách nhật ký hoạt động thành công', activityLogs);
    }
    async deleteOldLogs(days, req) {
        const userId = req.user.id;
        const count = await this.activityLogService.deleteOldLogs(days, userId);
        return (0, api_response_dto_1.createSuccessResponse)(`Đã xóa ${count} bản ghi nhật ký hoạt động cũ`);
    }
};
exports.ActivityLogController = ActivityLogController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách nhật ký hoạt động' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy danh sách nhật ký hoạt động thành công',
        type: [activity_log_dto_1.ActivityLogResponseDto],
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, activity_log_dto_1.ActivityLogQueryDto]),
    __metadata("design:returntype", Promise)
], ActivityLogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách nhật ký hoạt động của người dùng cụ thể' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy danh sách nhật ký hoạt động thành công',
        type: [activity_log_dto_1.ActivityLogResponseDto],
    }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, activity_log_dto_1.ActivityLogQueryDto]),
    __metadata("design:returntype", Promise)
], ActivityLogController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Delete)('cleanup/:days'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa nhật ký hoạt động cũ' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Xóa nhật ký hoạt động cũ thành công',
    }),
    __param(0, (0, common_1.Param)('days')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ActivityLogController.prototype, "deleteOldLogs", null);
exports.ActivityLogController = ActivityLogController = __decorate([
    (0, swagger_1.ApiTags)('Nhật ký hoạt động'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('activity-log'),
    __metadata("design:paramtypes", [activity_log_service_1.ActivityLogService])
], ActivityLogController);
//# sourceMappingURL=activity-log.controller.js.map