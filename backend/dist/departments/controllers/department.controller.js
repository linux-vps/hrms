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
exports.DepartmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const department_service_1 = require("../services/department.service");
const department_dto_1 = require("../dtos/department.dto");
const pagination_dto_1 = require("../../common/dtos/pagination.dto");
const roles_guard_1 = require("../../common/guards/roles.guard");
const activity_logger_interceptor_1 = require("../../common/interceptors/activity-logger.interceptor");
const enums_type_1 = require("../../common/types/enums.type");
const api_response_dto_1 = require("../../common/dtos/api-response.dto");
let DepartmentController = class DepartmentController {
    departmentService;
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    async findAll(paginationDto) {
        return this.departmentService.findAll(paginationDto);
    }
    async findOne(id) {
        const department = await this.departmentService.findById(id);
        return (0, api_response_dto_1.createSuccessResponse)('Lấy thông tin phòng ban thành công', department);
    }
    async create(createDepartmentDto) {
        const department = await this.departmentService.create(createDepartmentDto);
        return (0, api_response_dto_1.createSuccessResponse)('Tạo phòng ban thành công', department);
    }
    async update(id, updateDepartmentDto) {
        const department = await this.departmentService.update(id, updateDepartmentDto);
        return (0, api_response_dto_1.createSuccessResponse)('Cập nhật thông tin phòng ban thành công', department);
    }
    async delete(id) {
        const result = await this.departmentService.delete(id);
        return (0, api_response_dto_1.createSuccessResponse)('Xóa phòng ban thành công', result);
    }
};
exports.DepartmentController = DepartmentController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách phòng ban' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Danh sách phòng ban',
    }),
    (0, activity_logger_interceptor_1.LogActivity)('Xem danh sách phòng ban', 'department'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin phòng ban theo ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thông tin phòng ban',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Không tìm thấy phòng ban',
    }),
    (0, activity_logger_interceptor_1.LogActivity)('Xem thông tin phòng ban', 'department'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo phòng ban mới' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Phòng ban đã được tạo',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dữ liệu không hợp lệ',
    }),
    (0, activity_logger_interceptor_1.LogActivity)('Tạo phòng ban mới', 'department'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin phòng ban' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thông tin phòng ban đã được cập nhật',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Không tìm thấy phòng ban',
    }),
    (0, activity_logger_interceptor_1.LogActivity)('Cập nhật thông tin phòng ban', 'department'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, department_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa phòng ban' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Phòng ban đã được xóa',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Không thể xóa phòng ban có nhân viên',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Không tìm thấy phòng ban',
    }),
    (0, activity_logger_interceptor_1.LogActivity)('Xóa phòng ban', 'department'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "delete", null);
exports.DepartmentController = DepartmentController = __decorate([
    (0, swagger_1.ApiTags)('Phòng ban'),
    (0, common_1.Controller)('departments'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], DepartmentController);
//# sourceMappingURL=department.controller.js.map