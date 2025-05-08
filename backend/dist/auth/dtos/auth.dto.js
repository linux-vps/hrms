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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponseDto = exports.CreateAdminDto = exports.CreateUserForEmployeeDto = exports.RegisterDto = exports.LoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_type_1 = require("../../common/types/enums.type");
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email đăng nhập',
        example: 'user@example.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email không hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email không được để trống' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mật khẩu',
        example: 'Password123!',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mật khẩu không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Mật khẩu phải là chuỗi' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class RegisterDto {
    email;
    password;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email đăng ký',
        example: 'user@example.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email không hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email không được để trống' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mật khẩu',
        example: 'Password123!',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mật khẩu không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Mật khẩu phải là chuỗi' }),
    (0, class_validator_1.MinLength)(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
class CreateUserForEmployeeDto {
    email;
    password;
    role;
}
exports.CreateUserForEmployeeDto = CreateUserForEmployeeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email đăng nhập',
        example: 'employee@example.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email không hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email không được để trống' }),
    __metadata("design:type", String)
], CreateUserForEmployeeDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mật khẩu',
        example: 'Password123!',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mật khẩu không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Mật khẩu phải là chuỗi' }),
    (0, class_validator_1.MinLength)(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
    }),
    __metadata("design:type", String)
], CreateUserForEmployeeDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Vai trò người dùng',
        enum: enums_type_1.UserRole,
        default: enums_type_1.UserRole.EMPLOYEE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_type_1.UserRole, { message: 'Vai trò không hợp lệ' }),
    __metadata("design:type", String)
], CreateUserForEmployeeDto.prototype, "role", void 0);
class CreateAdminDto {
    email;
    password;
    employeeId;
}
exports.CreateAdminDto = CreateAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email đăng nhập',
        example: 'admin@example.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email không hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email không được để trống' }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mật khẩu',
        example: 'Password123!',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mật khẩu không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Mật khẩu phải là chuỗi' }),
    (0, class_validator_1.MinLength)(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID nhân viên (nếu có)',
        format: 'uuid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(4, { message: 'ID nhân viên không hợp lệ' }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "employeeId", void 0);
class LoginResponseDto {
    token;
    userId;
    employeeId;
    role;
}
exports.LoginResponseDto = LoginResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT Token',
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID người dùng',
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID nhân viên',
        required: false,
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vai trò người dùng',
        enum: enums_type_1.UserRole,
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "role", void 0);
//# sourceMappingURL=auth.dto.js.map