import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payroll } from './entities/payroll.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payroll]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class PayrollModule {} 