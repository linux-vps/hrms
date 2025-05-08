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
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const attendance_service_1 = require("../services/attendance.service");
const attendance_dto_1 = require("../dtos/attendance.dto");
const api_response_dto_1 = require("../../common/dtos/api-response.dto");
const activity_logger_interceptor_1 = require("../../common/interceptors/activity-logger.interceptor");
const roles_guard_1 = require("../../common/guards/roles.guard");
const enums_type_1 = require("../../common/types/enums.type");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const enums_type_2 = require("../../common/types/enums.type");
let AttendanceController = class AttendanceController {
    attendanceService;
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    async create(createAttendanceDto, req) {
        const userId = req.user.id;
        const attendance = await this.attendanceService.create(createAttendanceDto, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Tạo bản ghi chấm công thành công', attendance);
    }
    async findAll(query, req) {
        const userId = req.user.id;
        const attendances = await this.attendanceService.findAll(userId, query);
        return (0, api_response_dto_1.createSuccessResponse)('Lấy danh sách chấm công thành công', attendances);
    }
    async findOne(id, req) {
        const userId = req.user.id;
        const attendance = await this.attendanceService.findOne(id, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Lấy thông tin chấm công thành công', attendance);
    }
    async update(id, updateAttendanceDto, req) {
        const userId = req.user.id;
        const attendance = await this.attendanceService.update(id, updateAttendanceDto, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Cập nhật bản ghi chấm công thành công', attendance);
    }
    async remove(id, req) {
        const userId = req.user.id;
        await this.attendanceService.remove(id, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Xóa bản ghi chấm công thành công', { id });
    }
    async checkIn(req) {
        const userId = req.user.id;
        const attendance = await this.attendanceService.checkIn(userId);
        return (0, api_response_dto_1.createSuccessResponse)('Chấm công thành công', attendance);
    }
    async checkOut(req) {
        const userId = req.user.id;
        const attendance = await this.attendanceService.checkOut(userId);
        return (0, api_response_dto_1.createSuccessResponse)('Cập nhật thời gian kết thúc thành công', attendance);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo bản ghi chấm công mới (admin)' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Tạo chấm công thành công',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.CreateAttendanceDto, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách chấm công' }),
    (0, swagger_1.ApiQuery)({ name: 'employeeId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: enums_type_2.AttendanceStatus }),
    (0, swagger_1.ApiQuery)({ name: 'workShiftId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'isLate', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'isEarlyLeave', required: false, type: Boolean }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách chấm công',
        type: [attendance_dto_1.AttendanceResponseDto],
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy chi tiết bản ghi chấm công' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID chấm công' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thông tin chấm công',
        type: attendance_dto_1.AttendanceResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật bản ghi chấm công (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID chấm công' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cập nhật chấm công thành công',
        type: attendance_dto_1.AttendanceResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, attendance_dto_1.UpdateAttendanceDto, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa bản ghi chấm công (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID chấm công' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Xóa chấm công thành công',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('check-in'),
    (0, swagger_1.ApiOperation)({ summary: 'Chấm công (check-in)' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Chấm công thành công',
        type: attendance_dto_1.AttendanceResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "checkIn", null);
__decorate([
    (0, common_1.Post)('check-out'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thời gian kết thúc (check-out)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cập nhật thời gian kết thúc thành công',
        type: attendance_dto_1.AttendanceResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "checkOut", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, swagger_1.ApiTags)('Chấm công'),
    (0, common_1.Controller)('attendance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseInterceptors)(activity_logger_interceptor_1.ActivityLoggerInterceptor),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map