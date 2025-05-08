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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../services/auth.service");
const auth_dto_1 = require("../dtos/auth.dto");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const api_response_dto_1 = require("../../common/dtos/api-response.dto");
const roles_guard_1 = require("../../common/guards/roles.guard");
const enums_type_1 = require("../../common/types/enums.type");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        const user = await this.authService.login(loginDto);
        return (0, api_response_dto_1.createSuccessResponse)('Đăng nhập thành công', user);
    }
    async register(registerDto) {
        const result = await this.authService.register(registerDto);
        return (0, api_response_dto_1.createSuccessResponse)('Đăng ký thành công', result);
    }
    async createUserForEmployee(employeeId, createUserDto) {
        const { email, password, role } = createUserDto;
        const result = await this.authService.createUserForEmployee(employeeId, email, password, role);
        return (0, api_response_dto_1.createSuccessResponse)('Tạo tài khoản cho nhân viên thành công', result);
    }
    async createAdmin(createAdminDto) {
        const { email, password, employeeId } = createAdminDto;
        const result = await this.authService.createAdminUser(email, password, employeeId);
        return (0, api_response_dto_1.createSuccessResponse)('Tạo tài khoản admin thành công', result);
    }
    async getProfile(req) {
        const userId = req.user.sub;
        const user = await this.authService.getUserProfile(userId);
        return (0, api_response_dto_1.createSuccessResponse)('Lấy thông tin người dùng thành công', user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Đăng nhập vào hệ thống' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Đăng nhập thành công',
        type: auth_dto_1.LoginResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Email hoặc mật khẩu không đúng',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Đăng ký tài khoản mới' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Đăng ký thành công',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Email đã được sử dụng',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('create-user-for-employee/:employeeId'),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo tài khoản cho nhân viên đã tồn tại' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId', type: String, format: 'uuid' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Tạo tài khoản thành công',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Nhân viên đã có tài khoản hoặc dữ liệu không hợp lệ',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Không tìm thấy nhân viên',
    }),
    __param(0, (0, common_1.Param)('employeeId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, auth_dto_1.CreateUserForEmployeeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createUserForEmployee", null);
__decorate([
    (0, common_1.Post)('create-admin'),
    (0, roles_guard_1.Roles)(enums_type_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo tài khoản admin mới' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Tạo tài khoản admin thành công',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Email đã được sử dụng hoặc dữ liệu không hợp lệ',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin người dùng hiện tại' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Lấy thông tin thành công',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Xác thực'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map