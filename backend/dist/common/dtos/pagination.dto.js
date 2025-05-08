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
exports.PaginatedResultDto = exports.PaginationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PaginationDto {
    page = 1;
    limit = 10;
    offset() {
        return (this.page - 1) * this.limit;
    }
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số trang',
        example: 1,
        default: 1,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PaginationDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Số lượng dữ liệu trên mỗi trang',
        example: 10,
        default: 10,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PaginationDto.prototype, "limit", void 0);
class PaginatedResultDto {
    data;
    totalPages;
    totalItems;
    currentPage;
    constructor(data, totalItems, pagination) {
        this.data = data;
        this.totalItems = totalItems;
        this.currentPage = pagination.page;
        this.totalPages = Math.ceil(totalItems / pagination.limit);
    }
}
exports.PaginatedResultDto = PaginatedResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dữ liệu theo trang',
        isArray: true,
    }),
    __metadata("design:type", Array)
], PaginatedResultDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tổng số trang',
        example: 10,
    }),
    __metadata("design:type", Number)
], PaginatedResultDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tổng số bản ghi',
        example: 100,
    }),
    __metadata("design:type", Number)
], PaginatedResultDto.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trang hiện tại',
        example: 1,
    }),
    __metadata("design:type", Number)
], PaginatedResultDto.prototype, "currentPage", void 0);
//# sourceMappingURL=pagination.dto.js.map