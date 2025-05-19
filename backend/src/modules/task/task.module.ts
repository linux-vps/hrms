import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { SubTask } from './entities/subtask.entity';
import { Comment } from './entities/comment.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MailModule } from '../mail/mail.module';
import { Project } from '../project/entities/project.entity';
import { Employee } from '../employee/entities/employee.entity';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, SubTask, Comment, Project, Employee]),
    MailModule,
    ProjectModule
  ],
  controllers: [TaskController, CommentController],
  providers: [TaskService, CommentService],
  exports: [TaskService, CommentService]
})
export class TaskModule {} 