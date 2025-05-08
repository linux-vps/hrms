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
exports.Payroll = void 0;
const base_entity_type_1 = require("../../common/types/base-entity.type");
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const payroll_allowance_entity_1 = require("./payroll-allowance.entity");
const payroll_deduction_entity_1 = require("./payroll-deduction.entity");
const payroll_bonus_entity_1 = require("./payroll-bonus.entity");
let Payroll = class Payroll extends base_entity_type_1.BaseEntity {
    employee;
    employeeId;
    month;
    year;
    baseSalary;
    workingDays;
    standardWorkingDays;
    overtimeHours;
    overtimePay;
    grossSalary;
    allowances;
    bonuses;
    deductions;
    totalAllowance;
    totalBonus;
    totalDeduction;
    socialInsurance;
    healthInsurance;
    unemploymentInsurance;
    personalIncomeTax;
    netSalary;
    note;
    isPaid;
    paymentDate;
};
exports.Payroll = Payroll;
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employee_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], Payroll.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id' }),
    __metadata("design:type", String)
], Payroll.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Payroll.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Payroll.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Payroll.prototype, "baseSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'working_days', type: 'decimal', precision: 5, scale: 1, default: 0 }),
    __metadata("design:type", Number)
], Payroll.prototype, "workingDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'standard_working_days', type: 'decimal', precision: 5, scale: 1, default: 22 }),
    __metadata("design:type", Number)
], Payroll.prototype, "standardWorkingDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'overtime_hours', type: 'decimal', precision: 5, scale: 1, default: 0 }),
    __metadata("design:type", Number)
], Payroll.prototype, "overtimeHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'overtime_pay', type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Payroll.prototype, "overtimePay", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Payroll.prototype, "grossSalary", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payroll_allowance_entity_1.PayrollAllowance, allowance => allowance.payroll, { cascade: true }),
    __metadata("design:type", Array)
], Payroll.prototype, "allowances", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payroll_bonus_entity_1.PayrollBonus, bonus => bonus.payroll, { cascade: true }),
    __metadata("design:type", Array)
], Payroll.prototype, "bonuses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payroll_deduction_entity_1.PayrollDeduction, deduction => deduction.payroll, { cascade: true }),
    __metadata("design:type", Array)
], Payroll.prototype, "deductions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_allowance', type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Payroll.prototype, "totalAllowance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_bonus', type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Payroll.prototype, "totalBonus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_deduction', type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Payroll.prototype, "totalDeduction", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'social_insurance', type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Payroll.prototype, "socialInsurance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'health_insurance', type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Payroll.prototype, "healthInsurance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unemployment_insurance', type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Payroll.prototype, "unemploymentInsurance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'personal_income_tax', type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Payroll.prototype, "personalIncomeTax", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Payroll.prototype, "netSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Payroll.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_paid', default: false }),
    __metadata("design:type", Boolean)
], Payroll.prototype, "isPaid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_date', nullable: true }),
    __metadata("design:type", Date)
], Payroll.prototype, "paymentDate", void 0);
exports.Payroll = Payroll = __decorate([
    (0, typeorm_1.Entity)('payrolls')
], Payroll);
//# sourceMappingURL=payroll.entity.js.map