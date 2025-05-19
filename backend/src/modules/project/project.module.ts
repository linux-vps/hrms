import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { MailModule } from '../mail/mail.module';
import { Employee } from '../employee/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Employee]),
    MailModule
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService]
})
export class ProjectModule {} 