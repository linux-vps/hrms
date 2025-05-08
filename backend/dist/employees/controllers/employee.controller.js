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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const employee_service_1 = require("../services/employee.service");
const employee_dto_1 = require("../dtos/employee.dto");
const enums_type_1 = require("../../common/types/enums.type");
const roles_guard_1 = require("../../common/guards/roles.guard");
const pagination_dto_1 = require("../../common/dtos/pagination.dto");
let EmployeeController = class EmployeeController {
    employeeService;
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async findAll(paginationDto, search) {
        return this.employeeService.findAll(paginationDto, search);
    }
    async findById(id) {
        return this.employeeService.findById(id);
    }
    async create(createEmployeeDto, createAccount) {
        return this.employeeService.create(createEmployeeDto, createAccount);
    }
    async update(id, updateEmployeeDto) {
        return this.employeeService.update(id, updateEmployeeDto);
    }
    async updateSalary(id, updateSalaryDto) {
        return this.employeeService.updateSalary(id, updateSalaryDto);
    }
    async delete(id) {
        return this.employeeService.delete(id);
    }
    async uploadAvatar(id, file) {
        if (!file) {
            throw new common_1.BadRequestException('Không có file được tải lên');
        }
        const avatarUrl = `uploads/avatars/${file.filename}`;
        return this.employeeService.updateAvatar(id, avatarUrl);
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách nhân viên' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Danh sách nhân viên với phân trang' }),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin nhân viên theo ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của nhân viên' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thông tin nhân viên',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Không tìm thấy nhân viên',
    }),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo nhân viên mới' }),
    (0, swagger_1.ApiBody)({ type: employee_dto_1.CreateEmployeeDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Nhân viên đã được tạo',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dữ liệu không hợp lệ',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'createAccount',
        required: false,
        type: Boolean,
        description: 'Tạo tài khoản cho nhân viên'
    }),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('createAccount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_dto_1.CreateEmployeeDto, Boolean]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin nhân viên' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID của nhân viên' }),
    (0, swagger_1.ApiBody)({ type: employee_dto_1.UpdateEmployeeDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Thông tin nhân viên đã được cập nhật',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Không tìm thấy nhân viên',
    }),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employee_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/salary'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật lương nhân viên' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, format: 'uuid' }),
    (0, swagger_1.ApiBody)({ type: employee_dto_1.UpdateSalaryDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lương nhân viên đã được cập nhật',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Không tìm thấy nhân viên',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employee_dto_1.UpdateSalaryDto]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateSalary", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa nhân viên' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Nhân viên đã được xóa',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Không tìm thấy nhân viên',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/avatar'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload ảnh đại diện nhân viên' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID nhân viên' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Upload ảnh thành công' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy nhân viên' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "uploadAvatar", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, swagger_1.ApiTags)('employees'),
    (0, common_1.Controller)('employees'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeController);
//# sourceMappingURL=employee.controller.js.map