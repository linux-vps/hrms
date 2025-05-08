"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const attendance_entity_1 = require("./entities/attendance.entity");
const work_shift_entity_1 = require("./entities/work-shift.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
const user_entity_1 = require("../auth/entities/user.entity");
const attendance_controller_1 = require("./controllers/attendance.controller");
const work_shift_controller_1 = require("./controllers/work-shift.controller");
const attendance_service_1 = require("./services/attendance.service");
const work_shift_service_1 = require("./services/work-shift.service");
let AttendanceModule = class AttendanceModule {
};
exports.AttendanceModule = AttendanceModule;
exports.AttendanceModule = AttendanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([attendance_entity_1.Attendance, work_shift_entity_1.WorkShift, employee_entity_1.Employee, user_entity_1.User]),
        ],
        controllers: [attendance_controller_1.AttendanceController, work_shift_controller_1.WorkShiftController],
        providers: [attendance_service_1.AttendanceService, work_shift_service_1.WorkShiftService],
        exports: [typeorm_1.TypeOrmModule],
    })
], AttendanceModule);
//# sourceMappingURL=attendance.module.js.map