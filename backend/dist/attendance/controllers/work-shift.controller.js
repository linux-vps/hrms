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
exports.WorkShiftController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const enums_type_1 = require("../../common/types/enums.type");
const work_shift_service_1 = require("../services/work-shift.service");
const work_shift_dto_1 = require("../dtos/work-shift.dto");
const api_response_dto_1 = require("../../common/dtos/api-response.dto");
let WorkShiftController = class WorkShiftController {
    workShiftService;
    constructor(workShiftService) {
        this.workShiftService = workShiftService;
    }
    async create(createWorkShiftDto) {
        const workShift = await this.workShiftService.create(createWorkShiftDto);
        return (0, api_response_dto_1.createSuccessResponse)('Tạo ca làm việc thành công', workShift);
    }
    async findAll(active) {
        let isActive = undefined;
        if (active !== undefined) {
            isActive = active === 'true';
        }
        const workShifts = await this.workShiftService.findAll(isActive);
        return (0, api_response_dto_1.createSuccessResponse)('Lấy danh sách ca làm việc thành công', workShifts);
    }
    async findOne(id) {
        const workShift = await this.workShiftService.findOne(id);
        return (0, api_response_dto_1.createSuccessResponse)('Lấy thông tin ca làm việc thành công', workShift);
    }
    async update(id, updateWorkShiftDto) {
        const workShift = await this.workShiftService.update(id, updateWorkShiftDto);
        return (0, api_response_dto_1.createSuccessResponse)('Cập nhật ca làm việc thành công', workShift);
    }
    async remove(id) {
        const result = await this.workShiftService.remove(id);
        return (0, api_response_dto_1.createSuccessResponse)(result.message, { id, success: result.success });
    }
};
exports.WorkShiftController = WorkShiftController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo ca làm việc mới' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Tạo ca làm việc thành công',
        type: work_shift_dto_1.WorkShiftResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [work_shift_dto_1.CreateWorkShiftDto]),
    __metadata("design:returntype", Promise)
], WorkShiftController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách ca làm việc' }),
    (0, swagger_1.ApiQuery)({ name: 'active', required: false, type: Boolean }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách ca làm việc',
        type: [work_shift_dto_1.WorkShiftResponseDto],
    }),
    __param(0, (0, common_1.Query)('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkShiftController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin ca làm việc theo ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID ca làm việc' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thông tin ca làm việc',
        type: work_shift_dto_1.WorkShiftResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy ca làm việc' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkShiftController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin ca làm việc' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID ca làm việc' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cập nhật ca làm việc thành công',
        type: work_shift_dto_1.WorkShiftResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy ca làm việc' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, work_shift_dto_1.UpdateWorkShiftDto]),
    __metadata("design:returntype", Promise)
], WorkShiftController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa ca làm việc' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID ca làm việc' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Xóa ca làm việc thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy ca làm việc' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkShiftController.prototype, "remove", null);
exports.WorkShiftController = WorkShiftController = __decorate([
    (0, swagger_1.ApiTags)('Ca làm việc'),
    (0, common_1.Controller)('work-shifts'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [work_shift_service_1.WorkShiftService])
], WorkShiftController);
//# sourceMappingURL=work-shift.controller.js.map