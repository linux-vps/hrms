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
exports.WorkShiftService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const work_shift_entity_1 = require("../entities/work-shift.entity");
let WorkShiftService = class WorkShiftService {
    workShiftRepository;
    constructor(workShiftRepository) {
        this.workShiftRepository = workShiftRepository;
    }
    async create(createWorkShiftDto) {
        const workShift = this.workShiftRepository.create(createWorkShiftDto);
        return this.workShiftRepository.save(workShift);
    }
    async findAll(active) {
        const queryBuilder = this.workShiftRepository.createQueryBuilder('workShift');
        if (active !== undefined) {
            queryBuilder.where('workShift.active = :active', { active });
            queryBuilder.andWhere('workShift.isActive = :isActive', { isActive: true });
        }
        else {
            queryBuilder.where('workShift.isActive = :isActive', { isActive: true });
        }
        return queryBuilder.orderBy('workShift.createdAt', 'DESC').getMany();
    }
    async findOne(id) {
        const workShift = await this.workShiftRepository.findOne({ where: { id } });
        if (!workShift) {
            throw new common_1.NotFoundException('Không tìm thấy ca làm việc');
        }
        return workShift;
    }
    async update(id, updateWorkShiftDto) {
        const workShift = await this.findOne(id);
        this.workShiftRepository.merge(workShift, updateWorkShiftDto);
        return this.workShiftRepository.save(workShift);
    }
    async remove(id) {
        await this.findOne(id);
        await this.workShiftRepository.softDelete(id);
        await this.workShiftRepository.update(id, { isActive: false });
        return {
            success: true,
            message: 'Xóa ca làm việc thành công'
        };
    }
};
exports.WorkShiftService = WorkShiftService;
exports.WorkShiftService = WorkShiftService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(work_shift_entity_1.WorkShift)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WorkShiftService);
//# sourceMappingURL=work-shift.service.js.map