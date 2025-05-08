import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './entities/feed.entity';
import { Department } from 'src/departments/entities/department.entity';
import { User } from 'src/auth/entities/user.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { FeedController } from './controllers/feed.controller';
import { FeedService } from './services/feed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feed, Department, User, Employee]),
  ],
  controllers: [FeedController],
  providers: [FeedService],
  exports: [FeedService, TypeOrmModule],
})
export class FeedModule {} 