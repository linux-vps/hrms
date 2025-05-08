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
exports.PayrollDeduction = void 0;
const base_entity_type_1 = require("../../common/types/base-entity.type");
const typeorm_1 = require("typeorm");
const payroll_entity_1 = require("./payroll.entity");
let PayrollDeduction = class PayrollDeduction extends base_entity_type_1.BaseEntity {
    payroll;
    payrollId;
    name;
    description;
    amount;
};
exports.PayrollDeduction = PayrollDeduction;
__decorate([
    (0, typeorm_1.ManyToOne)(() => payroll_entity_1.Payroll, payroll => payroll.deductions),
    (0, typeorm_1.JoinColumn)({ name: 'payroll_id' }),
    __metadata("design:type", payroll_entity_1.Payroll)
], PayrollDeduction.prototype, "payroll", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payroll_id' }),
    __metadata("design:type", String)
], PayrollDeduction.prototype, "payrollId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PayrollDeduction.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PayrollDeduction.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PayrollDeduction.prototype, "amount", void 0);
exports.PayrollDeduction = PayrollDeduction = __decorate([
    (0, typeorm_1.Entity)('payroll_deductions')
], PayrollDeduction);
//# sourceMappingURL=payroll-deduction.entity.js.map