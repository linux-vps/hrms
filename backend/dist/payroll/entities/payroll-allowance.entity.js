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
exports.PayrollAllowance = void 0;
const base_entity_type_1 = require("../../common/types/base-entity.type");
const typeorm_1 = require("typeorm");
const payroll_entity_1 = require("./payroll.entity");
let PayrollAllowance = class PayrollAllowance extends base_entity_type_1.BaseEntity {
    payroll;
    payrollId;
    name;
    description;
    amount;
    taxable;
};
exports.PayrollAllowance = PayrollAllowance;
__decorate([
    (0, typeorm_1.ManyToOne)(() => payroll_entity_1.Payroll, payroll => payroll.allowances),
    (0, typeorm_1.JoinColumn)({ name: 'payroll_id' }),
    __metadata("design:type", payroll_entity_1.Payroll)
], PayrollAllowance.prototype, "payroll", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payroll_id' }),
    __metadata("design:type", String)
], PayrollAllowance.prototype, "payrollId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PayrollAllowance.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PayrollAllowance.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PayrollAllowance.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], PayrollAllowance.prototype, "taxable", void 0);
exports.PayrollAllowance = PayrollAllowance = __decorate([
    (0, typeorm_1.Entity)('payroll_allowances')
], PayrollAllowance);
//# sourceMappingURL=payroll-allowance.entity.js.map