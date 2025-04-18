import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Employee } from './entities/employee.entity';
import { Department } from 'src/departments/entities/department.entity';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './services/employee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Department]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [TypeOrmModule, EmployeeService],
})
export class EmployeesModule {} 