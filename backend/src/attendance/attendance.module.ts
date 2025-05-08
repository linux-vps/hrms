import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { WorkShift } from './entities/work-shift.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { User } from 'src/auth/entities/user.entity';
import { AttendanceController } from './controllers/attendance.controller';
import { WorkShiftController } from './controllers/work-shift.controller';
import { AttendanceService } from './services/attendance.service';
import { WorkShiftService } from './services/work-shift.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance, WorkShift, Employee, User]),
  ],
  controllers: [AttendanceController, WorkShiftController],
  providers: [AttendanceService, WorkShiftService],
  exports: [TypeOrmModule],
})
export class AttendanceModule {} 