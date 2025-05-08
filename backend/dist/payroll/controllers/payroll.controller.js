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
exports.PayrollController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payroll_service_1 = require("../services/payroll.service");
const payroll_dto_1 = require("../dtos/payroll.dto");
const api_response_dto_1 = require("../../common/dtos/api-response.dto");
const activity_logger_interceptor_1 = require("../../common/interceptors/activity-logger.interceptor");
let PayrollController = class PayrollController {
    payrollService;
    constructor(payrollService) {
        this.payrollService = payrollService;
    }
    async create(createPayrollDto, req) {
        const userId = req.user.id;
        const payroll = await this.payrollService.create(createPayrollDto, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Tạo bảng lương thành công', payroll);
    }
    async findAll(req, query) {
        const userId = req.user.id;
        const payrolls = await this.payrollService.findAll(userId, query);
        return (0, api_response_dto_1.createSuccessResponse)('Lấy danh sách bảng lương thành công', payrolls);
    }
    async findOne(id, req) {
        const userId = req.user.id;
        const payroll = await this.payrollService.findOne(id, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Lấy thông tin bảng lương thành công', payroll);
    }
    async update(id, updatePayrollDto, req) {
        const userId = req.user.id;
        const payroll = await this.payrollService.update(id, updatePayrollDto, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Cập nhật thông tin bảng lương thành công', payroll);
    }
    async remove(id, req) {
        const userId = req.user.id;
        await this.payrollService.remove(id, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Xóa bảng lương thành công');
    }
    async generateMonthlyPayrolls(req) {
        const userId = req.user.id;
        const payrolls = await this.payrollService.generateMonthlyPayrolls(userId);
        return (0, api_response_dto_1.createSuccessResponse)('Tạo bảng lương hàng loạt thành công', payrolls);
    }
};
exports.PayrollController = PayrollController;
__decorate([
    (0, common_1.Post)(),
    (0, activity_logger_interceptor_1.LogActivity)('Tạo bảng lương', 'Payroll'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo bảng lương mới' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Tạo bảng lương thành công',
        type: payroll_dto_1.PayrollResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_dto_1.CreatePayrollDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách bảng lương' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy danh sách bảng lương thành công',
        type: [payroll_dto_1.PayrollResponseDto],
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin bảng lương theo ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy thông tin bảng lương thành công',
        type: payroll_dto_1.PayrollResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, activity_logger_interceptor_1.LogActivity)('Cập nhật bảng lương', 'Payroll'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin bảng lương' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cập nhật thông tin bảng lương thành công',
        type: payroll_dto_1.PayrollResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_dto_1.UpdatePayrollDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, activity_logger_interceptor_1.LogActivity)('Xóa bảng lương', 'Payroll'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa bảng lương' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Xóa bảng lương thành công',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('generate-monthly'),
    (0, activity_logger_interceptor_1.LogActivity)('Tạo bảng lương tháng', 'Payroll'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo tất cả bảng lương cho tháng hiện tại' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Tạo bảng lương hàng loạt thành công',
        type: [payroll_dto_1.PayrollResponseDto],
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "generateMonthlyPayrolls", null);
exports.PayrollController = PayrollController = __decorate([
    (0, swagger_1.ApiTags)('Bảng lương'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('payroll'),
    __metadata("design:paramtypes", [payroll_service_1.PayrollService])
], PayrollController);
//# sourceMappingURL=payroll.controller.js.map