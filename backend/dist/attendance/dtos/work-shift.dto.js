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
exports.WorkShiftResponseDto = exports.UpdateWorkShiftDto = exports.CreateWorkShiftDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_type_1 = require("../../common/types/enums.type");
class CreateWorkShiftDto {
    name;
    description;
    type;
    startTime;
    endTime;
    breakStart;
    breakEnd;
    active;
}
exports.CreateWorkShiftDto = CreateWorkShiftDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên ca làm việc' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên ca làm việc không được để trống' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkShiftDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mô tả ca làm việc', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkShiftDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Loại ca làm việc',
        enum: enums_type_1.WorkShiftType,
        default: enums_type_1.WorkShiftType.FULL_DAY,
    }),
    (0, class_validator_1.IsEnum)(enums_type_1.WorkShiftType, { message: 'Loại ca làm việc không hợp lệ' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWorkShiftDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian bắt đầu ca (HH:MM)',
        example: '08:00',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Thời gian bắt đầu không được để trống' }),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Thời gian bắt đầu phải có định dạng HH:MM',
    }),
    __metadata("design:type", String)
], CreateWorkShiftDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian kết thúc ca (HH:MM)',
        example: '17:00',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Thời gian kết thúc không được để trống' }),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Thời gian kết thúc phải có định dạng HH:MM',
    }),
    __metadata("design:type", String)
], CreateWorkShiftDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian bắt đầu nghỉ giữa ca (HH:MM)',
        required: false,
        example: '12:00',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Thời gian bắt đầu nghỉ phải có định dạng HH:MM',
    }),
    __metadata("design:type", String)
], CreateWorkShiftDto.prototype, "breakStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian kết thúc nghỉ giữa ca (HH:MM)',
        required: false,
        example: '13:00',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Thời gian kết thúc nghỉ phải có định dạng HH:MM',
    }),
    __metadata("design:type", String)
], CreateWorkShiftDto.prototype, "breakEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trạng thái hoạt động', default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateWorkShiftDto.prototype, "active", void 0);
class UpdateWorkShiftDto {
    name;
    description;
    type;
    startTime;
    endTime;
    breakStart;
    breakEnd;
    active;
}
exports.UpdateWorkShiftDto = UpdateWorkShiftDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên ca làm việc', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkShiftDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mô tả ca làm việc', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkShiftDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Loại ca làm việc',
        enum: enums_type_1.WorkShiftType,
        required: false,
    }),
    (0, class_validator_1.IsEnum)(enums_type_1.WorkShiftType, { message: 'Loại ca làm việc không hợp lệ' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWorkShiftDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian bắt đầu ca (HH:MM)',
        required: false,
        example: '08:00',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Thời gian bắt đầu phải có định dạng HH:MM',
    }),
    __metadata("design:type", String)
], UpdateWorkShiftDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian kết thúc ca (HH:MM)',
        required: false,
        example: '17:00',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Thời gian kết thúc phải có định dạng HH:MM',
    }),
    __metadata("design:type", String)
], UpdateWorkShiftDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian bắt đầu nghỉ giữa ca (HH:MM)',
        required: false,
        example: '12:00',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Thời gian bắt đầu nghỉ phải có định dạng HH:MM',
    }),
    __metadata("design:type", String)
], UpdateWorkShiftDto.prototype, "breakStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian kết thúc nghỉ giữa ca (HH:MM)',
        required: false,
        example: '13:00',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Thời gian kết thúc nghỉ phải có định dạng HH:MM',
    }),
    __metadata("design:type", String)
], UpdateWorkShiftDto.prototype, "breakEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trạng thái hoạt động',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateWorkShiftDto.prototype, "active", void 0);
class WorkShiftResponseDto {
    id;
    name;
    description;
    type;
    startTime;
    endTime;
    breakStart;
    breakEnd;
    active;
    createdAt;
    updatedAt;
}
exports.WorkShiftResponseDto = WorkShiftResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID ca làm việc' }),
    __metadata("design:type", String)
], WorkShiftResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên ca làm việc' }),
    __metadata("design:type", String)
], WorkShiftResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Mô tả ca làm việc' }),
    __metadata("design:type", String)
], WorkShiftResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loại ca làm việc', enum: enums_type_1.WorkShiftType }),
    __metadata("design:type", String)
], WorkShiftResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian bắt đầu ca' }),
    __metadata("design:type", String)
], WorkShiftResponseDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian kết thúc ca' }),
    __metadata("design:type", String)
], WorkShiftResponseDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian bắt đầu nghỉ giữa ca' }),
    __metadata("design:type", String)
], WorkShiftResponseDto.prototype, "breakStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian kết thúc nghỉ giữa ca' }),
    __metadata("design:type", String)
], WorkShiftResponseDto.prototype, "breakEnd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trạng thái hoạt động' }),
    __metadata("design:type", Boolean)
], WorkShiftResponseDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày tạo' }),
    __metadata("design:type", Date)
], WorkShiftResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày cập nhật' }),
    __metadata("design:type", Date)
], WorkShiftResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=work-shift.dto.js.map