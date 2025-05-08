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
exports.LeaveResponseDto = exports.ApproveLeaveDto = exports.UpdateLeaveDto = exports.CreateLeaveDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_type_1 = require("../../common/types/enums.type");
class CreateLeaveDto {
    employeeId;
    type;
    startDate;
    endDate;
    days;
    reason;
}
exports.CreateLeaveDto = CreateLeaveDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateLeaveDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Loại nghỉ phép',
        enum: enums_type_1.LeaveType,
        default: enums_type_1.LeaveType.ANNUAL
    }),
    (0, class_validator_1.IsEnum)(enums_type_1.LeaveType),
    __metadata("design:type", String)
], CreateLeaveDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày bắt đầu', example: '2023-01-01' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateLeaveDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày kết thúc', example: '2023-01-02' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateLeaveDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số ngày nghỉ' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLeaveDto.prototype, "days", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lý do nghỉ phép' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaveDto.prototype, "reason", void 0);
class UpdateLeaveDto {
    type;
    startDate;
    endDate;
    days;
    reason;
}
exports.UpdateLeaveDto = UpdateLeaveDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Loại nghỉ phép',
        enum: enums_type_1.LeaveType,
        required: false
    }),
    (0, class_validator_1.IsEnum)(enums_type_1.LeaveType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeaveDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày bắt đầu', example: '2023-01-01', required: false }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateLeaveDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày kết thúc', example: '2023-01-02', required: false }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateLeaveDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số ngày nghỉ', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateLeaveDto.prototype, "days", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lý do nghỉ phép', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeaveDto.prototype, "reason", void 0);
class ApproveLeaveDto {
    status;
    note;
}
exports.ApproveLeaveDto = ApproveLeaveDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trạng thái duyệt',
        enum: enums_type_1.LeaveStatus,
        default: enums_type_1.LeaveStatus.APPROVED
    }),
    (0, class_validator_1.IsEnum)(enums_type_1.LeaveStatus),
    __metadata("design:type", String)
], ApproveLeaveDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ghi chú', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ApproveLeaveDto.prototype, "note", void 0);
class LeaveResponseDto {
    id;
    employeeId;
    employeeName;
    type;
    startDate;
    endDate;
    days;
    reason;
    status;
    approvedById;
    approvedByName;
    approvalDate;
    createdAt;
    updatedAt;
}
exports.LeaveResponseDto = LeaveResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID yêu cầu nghỉ phép' }),
    __metadata("design:type", String)
], LeaveResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    __metadata("design:type", String)
], LeaveResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên nhân viên' }),
    __metadata("design:type", String)
], LeaveResponseDto.prototype, "employeeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loại nghỉ phép', enum: enums_type_1.LeaveType }),
    __metadata("design:type", String)
], LeaveResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày bắt đầu' }),
    __metadata("design:type", Date)
], LeaveResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày kết thúc' }),
    __metadata("design:type", Date)
], LeaveResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số ngày nghỉ' }),
    __metadata("design:type", Number)
], LeaveResponseDto.prototype, "days", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lý do nghỉ phép' }),
    __metadata("design:type", String)
], LeaveResponseDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trạng thái', enum: enums_type_1.LeaveStatus }),
    __metadata("design:type", String)
], LeaveResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID người duyệt', required: false }),
    __metadata("design:type", String)
], LeaveResponseDto.prototype, "approvedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên người duyệt', required: false }),
    __metadata("design:type", String)
], LeaveResponseDto.prototype, "approvedByName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày duyệt', required: false }),
    __metadata("design:type", Date)
], LeaveResponseDto.prototype, "approvalDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian tạo' }),
    __metadata("design:type", Date)
], LeaveResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian cập nhật' }),
    __metadata("design:type", Date)
], LeaveResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=leaves.dto.js.map