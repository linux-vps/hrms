"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const database_config_1 = require("./common/configs/database.config");
const common_module_1 = require("./common/common.module");
const employees_module_1 = require("./employees/employees.module");
const departments_module_1 = require("./departments/departments.module");
const auth_module_1 = require("./auth/auth.module");
const attendance_module_1 = require("./attendance/attendance.module");
const leaves_module_1 = require("./leaves/leaves.module");
const payroll_module_1 = require("./payroll/payroll.module");
const activity_log_module_1 = require("./activity-log/activity-log.module");
const feed_module_1 = require("./feed/feed.module");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const activity_logger_interceptor_1 = require("./common/interceptors/activity-logger.interceptor");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: database_config_1.getDatabaseConfig,
            }),
            common_module_1.CommonModule,
            auth_module_1.AuthModule,
            employees_module_1.EmployeesModule,
            departments_module_1.DepartmentsModule,
            attendance_module_1.AttendanceModule,
            leaves_module_1.LeavesModule,
            payroll_module_1.PayrollModule,
            activity_log_module_1.ActivityLogModule,
            feed_module_1.FeedModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: activity_logger_interceptor_1.ActivityLoggerInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map