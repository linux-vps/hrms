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
exports.Feed = void 0;
const base_entity_type_1 = require("../../common/types/base-entity.type");
const typeorm_1 = require("typeorm");
const department_entity_1 = require("../../departments/entities/department.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
let Feed = class Feed extends base_entity_type_1.BaseEntity {
    title;
    content;
    createdBy;
    createdById;
    department;
    departmentId;
    timestamp;
    isImportant;
};
exports.Feed = Feed;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Feed.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Feed.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], Feed.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by' }),
    __metadata("design:type", String)
], Feed.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'department_id' }),
    __metadata("design:type", department_entity_1.Department)
], Feed.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'department_id', nullable: true }),
    __metadata("design:type", String)
], Feed.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Feed.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Feed.prototype, "isImportant", void 0);
exports.Feed = Feed = __decorate([
    (0, typeorm_1.Entity)('feeds')
], Feed);
//# sourceMappingURL=feed.entity.js.map