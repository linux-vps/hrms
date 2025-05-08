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
exports.LeavesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const leaves_service_1 = require("../services/leaves.service");
const leaves_dto_1 = require("../dtos/leaves.dto");
const api_response_dto_1 = require("../../common/dtos/api-response.dto");
const activity_logger_interceptor_1 = require("../../common/interceptors/activity-logger.interceptor");
let LeavesController = class LeavesController {
    leavesService;
    constructor(leavesService) {
        this.leavesService = leavesService;
    }
    async create(createLeaveDto, req) {
        const userId = req.user.id;
        const leave = await this.leavesService.create(createLeaveDto, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Tạo yêu cầu nghỉ phép thành công', leave);
    }
    async findAll(req, query) {
        const userId = req.user.id;
        const leaves = await this.leavesService.findAll(userId, query);
        return (0, api_response_dto_1.createSuccessResponse)('Lấy danh sách yêu cầu nghỉ phép thành công', leaves);
    }
    async findOne(id, req) {
        const userId = req.user.id;
        const leave = await this.leavesService.findOne(id, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Lấy thông tin yêu cầu nghỉ phép thành công', leave);
    }
    async update(id, updateLeaveDto, req) {
        const userId = req.user.id;
        const leave = await this.leavesService.update(id, updateLeaveDto, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Cập nhật thông tin yêu cầu nghỉ phép thành công', leave);
    }
    async remove(id, req) {
        const userId = req.user.id;
        await this.leavesService.remove(id, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Xóa yêu cầu nghỉ phép thành công');
    }
    async approve(id, approveLeaveDto, req) {
        const userId = req.user.id;
        const leave = await this.leavesService.approve(id, approveLeaveDto, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Duyệt yêu cầu nghỉ phép thành công', leave);
    }
};
exports.LeavesController = LeavesController;
__decorate([
    (0, common_1.Post)(),
    (0, activity_logger_interceptor_1.LogActivity)('Tạo yêu cầu nghỉ phép', 'Leave'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo yêu cầu nghỉ phép mới' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Tạo yêu cầu nghỉ phép thành công',
        type: leaves_dto_1.LeaveResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [leaves_dto_1.CreateLeaveDto, Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách yêu cầu nghỉ phép' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy danh sách yêu cầu nghỉ phép thành công',
        type: [leaves_dto_1.LeaveResponseDto],
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin yêu cầu nghỉ phép theo ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy thông tin yêu cầu nghỉ phép thành công',
        type: leaves_dto_1.LeaveResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, activity_logger_interceptor_1.LogActivity)('Cập nhật yêu cầu nghỉ phép', 'Leave'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin yêu cầu nghỉ phép' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cập nhật thông tin yêu cầu nghỉ phép thành công',
        type: leaves_dto_1.LeaveResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, leaves_dto_1.UpdateLeaveDto, Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, activity_logger_interceptor_1.LogActivity)('Xóa yêu cầu nghỉ phép', 'Leave'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa yêu cầu nghỉ phép' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Xóa yêu cầu nghỉ phép thành công',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, activity_logger_interceptor_1.LogActivity)('Duyệt yêu cầu nghỉ phép', 'Leave'),
    (0, swagger_1.ApiOperation)({ summary: 'Duyệt yêu cầu nghỉ phép' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Duyệt yêu cầu nghỉ phép thành công',
        type: leaves_dto_1.LeaveResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, leaves_dto_1.ApproveLeaveDto, Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "approve", null);
exports.LeavesController = LeavesController = __decorate([
    (0, swagger_1.ApiTags)('Nghỉ phép'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('leaves'),
    __metadata("design:paramtypes", [leaves_service_1.LeavesService])
], LeavesController);
//# sourceMappingURL=leaves.controller.js.map