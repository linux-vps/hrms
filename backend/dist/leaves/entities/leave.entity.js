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
exports.Leave = void 0;
const base_entity_type_1 = require("../../common/types/base-entity.type");
const enums_type_1 = require("../../common/types/enums.type");
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
let Leave = class Leave extends base_entity_type_1.BaseEntity {
    employee;
    employeeId;
    type;
    startDate;
    endDate;
    days;
    reason;
    status;
    approvedBy;
    approvedById;
    approvalDate;
};
exports.Leave = Leave;
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], Leave.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    __metadata("design:type", String)
], Leave.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_type_1.LeaveType,
        default: enums_type_1.LeaveType.ANNUAL,
    }),
    __metadata("design:type", String)
], Leave.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Leave.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Leave.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 1 }),
    __metadata("design:type", Number)
], Leave.prototype, "days", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Leave.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_type_1.LeaveStatus,
        default: enums_type_1.LeaveStatus.PENDING,
    }),
    __metadata("design:type", String)
], Leave.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'approved_by' }),
    __metadata("design:type", user_entity_1.User)
], Leave.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_by', nullable: true }),
    __metadata("design:type", String)
], Leave.prototype, "approvedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approval_date', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Leave.prototype, "approvalDate", void 0);
exports.Leave = Leave = __decorate([
    (0, typeorm_1.Entity)('leaves')
], Leave);
//# sourceMappingURL=leave.entity.js.map