import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { DepartmentController } from './controllers/department.controller';
import { DepartmentService } from './services/department.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Department]),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [TypeOrmModule, DepartmentService],
})
export class DepartmentsModule {} 