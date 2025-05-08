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
exports.Employee = void 0;
const base_entity_type_1 = require("../../common/types/base-entity.type");
const enums_type_1 = require("../../common/types/enums.type");
const typeorm_1 = require("typeorm");
const department_entity_1 = require("../../departments/entities/department.entity");
let Employee = class Employee extends base_entity_type_1.BaseEntity {
    firstName;
    lastName;
    dateOfBirth;
    gender;
    address;
    email;
    phone;
    department;
    departmentId;
    position;
    salary;
    role;
    hireDate;
    avatar;
    leaveDaysPerMonth;
    remainingLeaveDays;
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_type_1.Gender,
        nullable: true,
    }),
    __metadata("design:type", String)
], Employee.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (department) => department.employees),
    (0, typeorm_1.JoinColumn)({ name: 'department_id' }),
    __metadata("design:type", department_entity_1.Department)
], Employee.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'department_id', nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Employee.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_type_1.DepartmentRole,
        default: enums_type_1.DepartmentRole.MEMBER,
    }),
    __metadata("design:type", String)
], Employee.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: () => 'CURRENT_DATE' }),
    __metadata("design:type", Date)
], Employee.prototype, "hireDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'default.jpg' }),
    __metadata("design:type", String)
], Employee.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'leave_days_per_month', type: 'decimal', precision: 4, scale: 1, default: 5 }),
    __metadata("design:type", Number)
], Employee.prototype, "leaveDaysPerMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'remaining_leave_days', type: 'decimal', precision: 5, scale: 1, default: 5 }),
    __metadata("design:type", Number)
], Employee.prototype, "remainingLeaveDays", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)('employees')
], Employee);
//# sourceMappingURL=employee.entity.js.map