import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { getDatabaseConfig } from './common/configs/database.config';
import { CommonModule } from './common/common.module';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { AuthModule } from './auth/auth.module';
import { AttendanceModule } from './attendance/attendance.module';
import { LeavesModule } from './leaves/leaves.module';
import { PayrollModule } from './payroll/payroll.module';
import { ActivityLogModule } from './activity-log/activity-log.module';
import { FeedModule } from './feed/feed.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { ActivityLoggerInterceptor } from './common/interceptors/activity-logger.interceptor';

@Module({
  imports: [
    // Cấu hình môi trường
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Cấu hình TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    
    // Các module của ứng dụng
    CommonModule,
    AuthModule,
    EmployeesModule,
    DepartmentsModule,
    AttendanceModule,
    LeavesModule,
    PayrollModule,
    ActivityLogModule, 
    FeedModule,
  ],
  providers: [
    // Đăng ký guard xác thực JWT toàn cục
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Đăng ký interceptor ghi log hoạt động
    {
      provide: APP_INTERCEPTOR,
      useClass: ActivityLoggerInterceptor,
    },
  ],
})
export class AppModule {}
