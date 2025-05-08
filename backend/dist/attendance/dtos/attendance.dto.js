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
exports.AttendanceResponseDto = exports.UpdateAttendanceDto = exports.CreateAttendanceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_type_1 = require("../../common/types/enums.type");
class CreateAttendanceDto {
    employeeId;
    date;
    status;
    note;
    workShiftId;
    checkInTime;
    checkOutTime;
    isLate;
    isEarlyLeave;
}
exports.CreateAttendanceDto = CreateAttendanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID nhân viên không được trống' }),
    (0, class_validator_1.IsUUID)(4, { message: 'ID nhân viên không hợp lệ' }),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày chấm công' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Ngày chấm công không được trống' }),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày chấm công không hợp lệ' }),
    __metadata("design:type", Date)
], CreateAttendanceDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trạng thái chấm công', enum: enums_type_1.AttendanceStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_type_1.AttendanceStatus, { message: 'Trạng thái chấm công không hợp lệ' }),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ghi chú', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID ca làm việc', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(4, { message: 'ID ca làm việc không hợp lệ' }),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "workShiftId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian check-in (HH:MM)',
        required: false,
        example: '08:05'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Thời gian check-in phải có định dạng HH:MM',
    }),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "checkInTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian check-out (HH:MM)',
        required: false,
        example: '17:30'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Thời gian check-out phải có định dạng HH:MM',
    }),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "checkOutTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Đánh dấu đi muộn',
        required: false,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAttendanceDto.prototype, "isLate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Đánh dấu về sớm',
        required: false,
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAttendanceDto.prototype, "isEarlyLeave", void 0);
class UpdateAttendanceDto {
    status;
    note;
    workShiftId;
    checkInTime;
    checkOutTime;
    isLate;
    isEarlyLeave;
}
exports.UpdateAttendanceDto = UpdateAttendanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trạng thái chấm công', enum: enums_type_1.AttendanceStatus, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_type_1.AttendanceStatus, { message: 'Trạng thái chấm công không hợp lệ' }),
    __metadata("design:type", String)
], UpdateAttendanceDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ghi chú', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAttendanceDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID ca làm việc', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(4, { message: 'ID ca làm việc không hợp lệ' }),
    __metadata("design:type", String)
], UpdateAttendanceDto.prototype, "workShiftId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian check-in (HH:MM)',
        required: false,
        example: '08:05'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Thời gian check-in phải có định dạng HH:MM',
    }),
    __metadata("design:type", String)
], UpdateAttendanceDto.prototype, "checkInTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian check-out (HH:MM)',
        required: false,
        example: '17:30'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Thời gian check-out phải có định dạng HH:MM',
    }),
    __metadata("design:type", String)
], UpdateAttendanceDto.prototype, "checkOutTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Đánh dấu đi muộn',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateAttendanceDto.prototype, "isLate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Đánh dấu về sớm',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateAttendanceDto.prototype, "isEarlyLeave", void 0);
class AttendanceResponseDto {
    id;
    employeeId;
    date;
    status;
    note;
    workShiftId;
    checkInTime;
    checkOutTime;
    isLate;
    isEarlyLeave;
    createdAt;
    updatedAt;
}
exports.AttendanceResponseDto = AttendanceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID chấm công' }),
    __metadata("design:type", String)
], AttendanceResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhân viên' }),
    __metadata("design:type", String)
], AttendanceResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày chấm công' }),
    __metadata("design:type", Date)
], AttendanceResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trạng thái chấm công', enum: enums_type_1.AttendanceStatus }),
    __metadata("design:type", String)
], AttendanceResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ghi chú' }),
    __metadata("design:type", String)
], AttendanceResponseDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID ca làm việc' }),
    __metadata("design:type", String)
], AttendanceResponseDto.prototype, "workShiftId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian check-in' }),
    __metadata("design:type", String)
], AttendanceResponseDto.prototype, "checkInTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian check-out' }),
    __metadata("design:type", String)
], AttendanceResponseDto.prototype, "checkOutTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Đánh dấu đi muộn' }),
    __metadata("design:type", Boolean)
], AttendanceResponseDto.prototype, "isLate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Đánh dấu về sớm' }),
    __metadata("design:type", Boolean)
], AttendanceResponseDto.prototype, "isEarlyLeave", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày tạo' }),
    __metadata("design:type", Date)
], AttendanceResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày cập nhật' }),
    __metadata("design:type", Date)
], AttendanceResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=attendance.dto.js.map