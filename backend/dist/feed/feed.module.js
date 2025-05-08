"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const feed_entity_1 = require("./entities/feed.entity");
const department_entity_1 = require("../departments/entities/department.entity");
const user_entity_1 = require("../auth/entities/user.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
const feed_controller_1 = require("./controllers/feed.controller");
const feed_service_1 = require("./services/feed.service");
let FeedModule = class FeedModule {
};
exports.FeedModule = FeedModule;
exports.FeedModule = FeedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([feed_entity_1.Feed, department_entity_1.Department, user_entity_1.User, employee_entity_1.Employee]),
        ],
        controllers: [feed_controller_1.FeedController],
        providers: [feed_service_1.FeedService],
        exports: [feed_service_1.FeedService, typeorm_1.TypeOrmModule],
    })
], FeedModule);
//# sourceMappingURL=feed.module.js.map