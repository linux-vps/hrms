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
exports.PayrollResponseDto = exports.UpdatePayrollDto = exports.CreatePayrollDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePayrollDto {
    employeeId;
    month;
    year;
    baseSalary;
    workingDays;
    standardWorkingDays;
    overtimeHours;
    overtimePay;
    totalAllowance;
    totalBonus;
    totalDeduction;
    socialInsurance;
    healthInsurance;
    unemploymentInsurance;
    personalIncomeTax;
    note;
}
exports.CreatePayrollDto = CreatePayrollDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePayrollDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tháng', example: 1, minimum: 1, maximum: 12 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Năm', example: 2023 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(2000),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lương cơ bản', example: 10000000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "baseSalary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số ngày làm việc', example: 22, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "workingDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số ngày làm việc tiêu chuẩn', example: 22, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "standardWorkingDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số giờ làm thêm', example: 10, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "overtimeHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tiền làm thêm giờ', example: 500000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "overtimePay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tổng phụ cấp', example: 1000000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "totalAllowance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tổng thưởng', example: 1000000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "totalBonus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tổng khấu trừ', example: 1000000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "totalDeduction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bảo hiểm xã hội', example: 800000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "socialInsurance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bảo hiểm y tế', example: 150000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "healthInsurance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bảo hiểm thất nghiệp', example: 100000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "unemploymentInsurance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thuế thu nhập cá nhân', example: 200000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "personalIncomeTax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ghi chú', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePayrollDto.prototype, "note", void 0);
class UpdatePayrollDto {
    baseSalary;
    workingDays;
    standardWorkingDays;
    overtimeHours;
    overtimePay;
    totalAllowance;
    totalBonus;
    totalDeduction;
    socialInsurance;
    healthInsurance;
    unemploymentInsurance;
    personalIncomeTax;
    note;
}
exports.UpdatePayrollDto = UpdatePayrollDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lương cơ bản', example: 10000000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "baseSalary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số ngày làm việc', example: 22, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "workingDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số ngày làm việc tiêu chuẩn', example: 22, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "standardWorkingDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số giờ làm thêm', example: 10, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "overtimeHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tiền làm thêm giờ', example: 500000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "overtimePay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tổng phụ cấp', example: 1000000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "totalAllowance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tổng thưởng', example: 1000000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "totalBonus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tổng khấu trừ', example: 1000000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "totalDeduction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bảo hiểm xã hội', example: 800000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "socialInsurance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bảo hiểm y tế', example: 150000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "healthInsurance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bảo hiểm thất nghiệp', example: 100000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "unemploymentInsurance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thuế thu nhập cá nhân', example: 200000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "personalIncomeTax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ghi chú', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePayrollDto.prototype, "note", void 0);
class PayrollResponseDto {
    id;
    employeeId;
    employeeName;
    month;
    year;
    baseSalary;
    workingDays;
    overtimeHours;
    overtimePay;
    totalAllowance;
    totalBonus;
    totalDeduction;
    socialInsurance;
    healthInsurance;
    unemploymentInsurance;
    personalIncomeTax;
    netSalary;
    note;
    createdAt;
    updatedAt;
}
exports.PayrollResponseDto = PayrollResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID bảng lương' }),
    __metadata("design:type", String)
], PayrollResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    __metadata("design:type", String)
], PayrollResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên nhân viên' }),
    __metadata("design:type", String)
], PayrollResponseDto.prototype, "employeeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tháng' }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Năm' }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lương cơ bản' }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "baseSalary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số ngày làm việc' }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "workingDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số giờ làm thêm' }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "overtimeHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tiền làm thêm giờ' }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "overtimePay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tổng phụ cấp' }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "totalAllowance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tổng thưởng' }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "totalBonus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tổng khấu trừ' }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "totalDeduction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bảo hiểm xã hội' }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "socialInsurance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bảo hiểm y tế' }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "healthInsurance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bảo hiểm thất nghiệp' }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "unemploymentInsurance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thuế thu nhập cá nhân' }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "personalIncomeTax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lương thực lãnh' }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "netSalary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ghi chú', required: false }),
    __metadata("design:type", String)
], PayrollResponseDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian tạo' }),
    __metadata("design:type", Date)
], PayrollResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian cập nhật' }),
    __metadata("design:type", Date)
], PayrollResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=payroll.dto.js.map