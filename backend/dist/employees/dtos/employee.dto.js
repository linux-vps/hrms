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
exports.UpdateSalaryDto = exports.UpdateEmployeeDto = exports.CreateEmployeeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enums_type_1 = require("../../common/types/enums.type");
class CreateEmployeeDto {
    firstName;
    lastName;
    dateOfBirth;
    gender;
    address;
    email;
    phone;
    departmentId;
    position;
    role;
    salary;
    hireDate;
    leaveDaysPerMonth;
}
exports.CreateEmployeeDto = CreateEmployeeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Họ của nhân viên',
        example: 'Nguyễn',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Họ là bắt buộc' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên của nhân viên',
        example: 'Văn A',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên là bắt buộc' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Ngày sinh (yyyy-mm-dd)',
        example: '1990-01-01',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày sinh không hợp lệ' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Giới tính',
        enum: enums_type_1.Gender,
        example: enums_type_1.Gender.MALE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_type_1.Gender, { message: 'Giới tính không hợp lệ' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Địa chỉ',
        example: 'Hà Nội',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email',
        example: 'employee@example.com',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Số điện thoại',
        example: '0987654321',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID phòng ban',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Vị trí công việc',
        example: 'Nhân viên',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Vai trò trong phòng ban',
        enum: enums_type_1.DepartmentRole,
        default: enums_type_1.DepartmentRole.MEMBER,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_type_1.DepartmentRole, { message: 'Vai trò không hợp lệ' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Mức lương',
        example: 10000000,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Lương phải là số' }),
    (0, class_validator_1.IsPositive)({ message: 'Lương phải là số dương' }),
    __metadata("design:type", Number)
], CreateEmployeeDto.prototype, "salary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Ngày tuyển dụng (yyyy-mm-dd)',
        example: '2023-01-01',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày tuyển dụng không hợp lệ' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "hireDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Số ngày nghỉ phép mỗi tháng',
        default: 5,
        minimum: 0,
        maximum: 30,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Số ngày nghỉ phép phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'Số ngày nghỉ phép không được âm' }),
    (0, class_validator_1.Max)(30, { message: 'Số ngày nghỉ phép tối đa là 30' }),
    __metadata("design:type", Number)
], CreateEmployeeDto.prototype, "leaveDaysPerMonth", void 0);
class UpdateEmployeeDto extends (0, swagger_1.PartialType)(CreateEmployeeDto) {
    remainingLeaveDays;
}
exports.UpdateEmployeeDto = UpdateEmployeeDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Số ngày nghỉ phép còn lại',
        minimum: 0,
        example: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Số ngày nghỉ phép còn lại phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'Số ngày nghỉ phép còn lại không được âm' }),
    __metadata("design:type", Number)
], UpdateEmployeeDto.prototype, "remainingLeaveDays", void 0);
class UpdateSalaryDto {
    salary;
}
exports.UpdateSalaryDto = UpdateSalaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mức lương mới',
        example: 10000000,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'Lương phải là số' }),
    (0, class_validator_1.IsPositive)({ message: 'Lương phải là số dương' }),
    __metadata("design:type", Number)
], UpdateSalaryDto.prototype, "salary", void 0);
//# sourceMappingURL=employee.dto.js.map