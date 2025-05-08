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
exports.ApiResponseDto = void 0;
exports.createSuccessResponse = createSuccessResponse;
exports.createErrorResponse = createErrorResponse;
const swagger_1 = require("@nestjs/swagger");
class ApiResponseDto {
    success;
    message;
    data;
    timestamp;
    constructor(success, message, data, timestamp = new Date()) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.timestamp = timestamp;
    }
}
exports.ApiResponseDto = ApiResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trạng thái thành công' }),
    __metadata("design:type", Boolean)
], ApiResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thông báo' }),
    __metadata("design:type", String)
], ApiResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dữ liệu phản hồi', required: false }),
    __metadata("design:type", Object)
], ApiResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian phản hồi' }),
    __metadata("design:type", Date)
], ApiResponseDto.prototype, "timestamp", void 0);
function createSuccessResponse(message, data) {
    return new ApiResponseDto(true, message, data);
}
function createErrorResponse(message) {
    return new ApiResponseDto(false, message);
}
//# sourceMappingURL=api-response.dto.js.map