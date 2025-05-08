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
exports.UpdateDepartmentDto = exports.CreateDepartmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDepartmentDto {
    name;
    description;
}
exports.CreateDepartmentDto = CreateDepartmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tên phòng ban',
        example: 'Phòng Kỹ thuật',
    }),
    (0, class_validator_1.IsString)({ message: 'Tên phòng ban phải là chuỗi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên phòng ban không được để trống' }),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Mô tả phòng ban',
        example: 'Phòng chuyên về nghiên cứu và phát triển kỹ thuật',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Mô tả phải là chuỗi' }),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "description", void 0);
class UpdateDepartmentDto extends CreateDepartmentDto {
}
exports.UpdateDepartmentDto = UpdateDepartmentDto;
//# sourceMappingURL=department.dto.js.map