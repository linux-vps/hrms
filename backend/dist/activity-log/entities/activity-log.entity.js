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
exports.ActivityLog = void 0;
const base_entity_type_1 = require("../../common/types/base-entity.type");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../auth/entities/user.entity");
let ActivityLog = class ActivityLog extends base_entity_type_1.BaseEntity {
    user;
    userId;
    action;
    entityType;
    entityId;
    details;
    ipAddress;
    timestamp;
};
exports.ActivityLog = ActivityLog;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], ActivityLog.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], ActivityLog.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ActivityLog.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ActivityLog.prototype, "entityType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ActivityLog.prototype, "entityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ActivityLog.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'inet', nullable: true }),
    __metadata("design:type", String)
], ActivityLog.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ActivityLog.prototype, "timestamp", void 0);
exports.ActivityLog = ActivityLog = __decorate([
    (0, typeorm_1.Entity)('activity_logs')
], ActivityLog);
//# sourceMappingURL=activity-log.entity.js.map