import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payroll } from './entities/payroll.entity';
import { PayrollBonus } from './entities/payroll-bonus.entity';
import { PayrollDeduction } from './entities/payroll-deduction.entity';
import { PayrollAllowance } from './entities/payroll-allowance.entity';
import { PayrollConfig } from './entities/payroll-config.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { User } from 'src/auth/entities/user.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Leave } from 'src/leaves/entities/leave.entity';
import { PayrollController } from './controllers/payroll.controller';
import { PayrollService } from './services/payroll.service';
import { PayrollConfigController } from './controllers/payroll-config.controller';
import { PayrollConfigService } from './services/payroll-config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payroll, 
      PayrollBonus, 
      PayrollDeduction,
      PayrollAllowance,
      PayrollConfig,
      Employee, 
      User,
      Attendance,
      Leave
    ]),
  ],
  controllers: [PayrollController, PayrollConfigController],
  providers: [PayrollService, PayrollConfigService],
  exports: [TypeOrmModule],
})
export class PayrollModule {} 