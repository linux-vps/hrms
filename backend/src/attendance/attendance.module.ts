import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class AttendanceModule {} 