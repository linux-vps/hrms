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
exports.FeedResponseDto = exports.UpdateFeedDto = exports.CreateFeedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFeedDto {
    title;
    content;
    departmentId;
    isImportant;
}
exports.CreateFeedDto = CreateFeedDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tiêu đề thông báo' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFeedDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nội dung thông báo' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFeedDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID phòng ban (để trống nếu là thông báo toàn cục)', required: false }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFeedDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Đánh dấu là thông báo quan trọng', required: false, default: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateFeedDto.prototype, "isImportant", void 0);
class UpdateFeedDto {
    title;
    content;
    departmentId;
    isImportant;
}
exports.UpdateFeedDto = UpdateFeedDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tiêu đề thông báo', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFeedDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nội dung thông báo', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFeedDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID phòng ban (để trống nếu là thông báo toàn cục)', required: false }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFeedDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Đánh dấu là thông báo quan trọng', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateFeedDto.prototype, "isImportant", void 0);
class FeedResponseDto {
    id;
    title;
    content;
    createdById;
    createdByName;
    departmentId;
    departmentName;
    timestamp;
    isImportant;
    createdAt;
    updatedAt;
}
exports.FeedResponseDto = FeedResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID thông báo' }),
    __metadata("design:type", String)
], FeedResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tiêu đề thông báo' }),
    __metadata("design:type", String)
], FeedResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nội dung thông báo' }),
    __metadata("design:type", String)
], FeedResponseDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID người tạo' }),
    __metadata("design:type", String)
], FeedResponseDto.prototype, "createdById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên người tạo' }),
    __metadata("design:type", String)
], FeedResponseDto.prototype, "createdByName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID phòng ban', required: false }),
    __metadata("design:type", String)
], FeedResponseDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tên phòng ban', required: false }),
    __metadata("design:type", String)
], FeedResponseDto.prototype, "departmentName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian tạo' }),
    __metadata("design:type", Date)
], FeedResponseDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thông báo quan trọng' }),
    __metadata("design:type", Boolean)
], FeedResponseDto.prototype, "isImportant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian tạo' }),
    __metadata("design:type", Date)
], FeedResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian cập nhật' }),
    __metadata("design:type", Date)
], FeedResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=feed.dto.js.map