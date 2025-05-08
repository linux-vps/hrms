"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const employee_entity_1 = require("./entities/employee.entity");
const department_entity_1 = require("../departments/entities/department.entity");
const user_entity_1 = require("../auth/entities/user.entity");
const employee_controller_1 = require("./controllers/employee.controller");
const employee_service_1 = require("./services/employee.service");
let EmployeesModule = class EmployeesModule {
};
exports.EmployeesModule = EmployeesModule;
exports.EmployeesModule = EmployeesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([employee_entity_1.Employee, department_entity_1.Department, user_entity_1.User]),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/avatars',
                    filename: (req, file, cb) => {
                        const randomName = Array(32)
                            .fill(null)
                            .map(() => Math.round(Math.random() * 16).toString(16))
                            .join('');
                        cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
                    },
                }),
            }),
        ],
        controllers: [employee_controller_1.EmployeeController],
        providers: [employee_service_1.EmployeeService],
        exports: [typeorm_1.TypeOrmModule, employee_service_1.EmployeeService],
    })
], EmployeesModule);
//# sourceMappingURL=employees.module.js.map