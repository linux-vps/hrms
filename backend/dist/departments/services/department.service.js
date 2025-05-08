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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const department_entity_1 = require("../entities/department.entity");
const pagination_dto_1 = require("../../common/dtos/pagination.dto");
let DepartmentService = class DepartmentService {
    departmentRepository;
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    async findAll(paginationDto) {
        const offset = paginationDto.offset();
        const [departments, totalItems] = await this.departmentRepository.findAndCount({
            skip: offset,
            take: paginationDto.limit,
            relations: ['employees'],
        });
        return new pagination_dto_1.PaginatedResultDto(departments, totalItems, paginationDto);
    }
    async findById(id) {
        const department = await this.departmentRepository.findOne({
            where: { id },
        });
        if (!department) {
            throw new common_1.NotFoundException(`Không tìm thấy phòng ban với ID ${id}`);
        }
        return department;
    }
    async create(createDepartmentDto) {
        const { name } = createDepartmentDto;
        const existingDepartment = await this.departmentRepository.findOne({
            where: { name },
        });
        if (existingDepartment) {
            throw new common_1.BadRequestException(`Phòng ban với tên ${name} đã tồn tại`);
        }
        const department = this.departmentRepository.create(createDepartmentDto);
        return this.departmentRepository.save(department);
    }
    async update(id, updateDepartmentDto) {
        const { name } = updateDepartmentDto;
        const department = await this.findById(id);
        if (name && name !== department.name) {
            const existingDepartment = await this.departmentRepository.findOne({
                where: { name },
            });
            if (existingDepartment) {
                throw new common_1.BadRequestException(`Phòng ban với tên ${name} đã tồn tại`);
            }
        }
        const updatedDepartment = this.departmentRepository.merge(department, updateDepartmentDto);
        return this.departmentRepository.save(updatedDepartment);
    }
    async delete(id) {
        const department = await this.findById(id);
        if (department.employees && department.employees.length > 0) {
            throw new common_1.BadRequestException('Không thể xóa phòng ban có nhân viên. Hãy chuyển nhân viên sang phòng ban khác trước.');
        }
        await this.departmentRepository.softDelete(id);
        return { id, success: true };
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepartmentService);
//# sourceMappingURL=department.service.js.map