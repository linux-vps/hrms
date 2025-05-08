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
exports.ActivityLogQueryDto = exports.ActivityLogResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ActivityLogResponseDto {
    id;
    userId;
    userName;
    action;
    entityType;
    entityId;
    details;
    ipAddress;
    timestamp;
}
exports.ActivityLogResponseDto = ActivityLogResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID nhật ký' }),
    __metadata("design:type", String)
], ActivityLogResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID người dùng' }),
    __metadata("design:type", String)
], ActivityLogResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên người dùng' }),
    __metadata("design:type", String)
], ActivityLogResponseDto.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Hành động' }),
    __metadata("design:type", String)
], ActivityLogResponseDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loại thực thể', required: false }),
    __metadata("design:type", String)
], ActivityLogResponseDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID thực thể', required: false }),
    __metadata("design:type", String)
], ActivityLogResponseDto.prototype, "entityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chi tiết', required: false }),
    __metadata("design:type", String)
], ActivityLogResponseDto.prototype, "details", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Địa chỉ IP', required: false }),
    __metadata("design:type", String)
], ActivityLogResponseDto.prototype, "ipAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian thực hiện' }),
    __metadata("design:type", Date)
], ActivityLogResponseDto.prototype, "timestamp", void 0);
class ActivityLogQueryDto {
    userId;
    action;
    entityType;
    entityId;
    fromDate;
    toDate;
}
exports.ActivityLogQueryDto = ActivityLogQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID người dùng', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ActivityLogQueryDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Hành động', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ActivityLogQueryDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Loại thực thể', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ActivityLogQueryDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID thực thể', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ActivityLogQueryDto.prototype, "entityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Từ ngày', required: false }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ActivityLogQueryDto.prototype, "fromDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Đến ngày', required: false }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ActivityLogQueryDto.prototype, "toDate", void 0);
//# sourceMappingURL=activity-log.dto.js.map