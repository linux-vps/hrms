import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payroll } from './entities/payroll.entity';
import { PayrollBonus } from './entities/payroll-bonus.entity';
import { PayrollDeduction } from './entities/payroll-deduction.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { User } from 'src/auth/entities/user.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Leave } from 'src/leaves/entities/leave.entity';
import { PayrollController } from './controllers/payroll.controller';
import { PayrollService } from './services/payroll.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payroll, 
      PayrollBonus, 
      PayrollDeduction, 
      Employee, 
      User,
      Attendance,
      Leave
    ]),
  ],
  controllers: [PayrollController],
  providers: [PayrollService],
  exports: [TypeOrmModule],
})
export class PayrollModule {} 