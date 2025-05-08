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
exports.WorkShift = void 0;
const base_entity_type_1 = require("../../common/types/base-entity.type");
const enums_type_1 = require("../../common/types/enums.type");
const typeorm_1 = require("typeorm");
let WorkShift = class WorkShift extends base_entity_type_1.BaseEntity {
    name;
    description;
    type;
    startTime;
    endTime;
    breakStart;
    breakEnd;
    active;
};
exports.WorkShift = WorkShift;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkShift.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], WorkShift.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_type_1.WorkShiftType,
        default: enums_type_1.WorkShiftType.FULL_DAY,
    }),
    __metadata("design:type", String)
], WorkShift.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_time', type: 'time' }),
    __metadata("design:type", String)
], WorkShift.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_time', type: 'time' }),
    __metadata("design:type", String)
], WorkShift.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'break_start', type: 'time', nullable: true }),
    __metadata("design:type", String)
], WorkShift.prototype, "breakStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'break_end', type: 'time', nullable: true }),
    __metadata("design:type", String)
], WorkShift.prototype, "breakEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], WorkShift.prototype, "active", void 0);
exports.WorkShift = WorkShift = __decorate([
    (0, typeorm_1.Entity)('work_shifts')
], WorkShift);
//# sourceMappingURL=work-shift.entity.js.map