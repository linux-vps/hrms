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
exports.Attendance = void 0;
const base_entity_type_1 = require("../../common/types/base-entity.type");
const enums_type_1 = require("../../common/types/enums.type");
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const work_shift_entity_1 = require("./work-shift.entity");
let Attendance = class Attendance extends base_entity_type_1.BaseEntity {
    employee;
    employeeId;
    date;
    status;
    note;
    workShift;
    workShiftId;
    checkInTime;
    checkOutTime;
    isLate;
    isEarlyLeave;
};
exports.Attendance = Attendance;
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], Attendance.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    __metadata("design:type", String)
], Attendance.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Attendance.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_type_1.AttendanceStatus,
        default: enums_type_1.AttendanceStatus.PRESENT,
    }),
    __metadata("design:type", String)
], Attendance.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Attendance.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => work_shift_entity_1.WorkShift, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'work_shift_id' }),
    __metadata("design:type", work_shift_entity_1.WorkShift)
], Attendance.prototype, "workShift", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_shift_id', nullable: true }),
    __metadata("design:type", String)
], Attendance.prototype, "workShiftId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'check_in_time', type: 'time', nullable: true }),
    __metadata("design:type", String)
], Attendance.prototype, "checkInTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'check_out_time', type: 'time', nullable: true }),
    __metadata("design:type", String)
], Attendance.prototype, "checkOutTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_late', default: false }),
    __metadata("design:type", Boolean)
], Attendance.prototype, "isLate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_early_leave', default: false }),
    __metadata("design:type", Boolean)
], Attendance.prototype, "isEarlyLeave", void 0);
exports.Attendance = Attendance = __decorate([
    (0, typeorm_1.Entity)('attendances')
], Attendance);
//# sourceMappingURL=attendance.entity.js.map