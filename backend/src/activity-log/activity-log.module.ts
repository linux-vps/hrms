import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from './entities/activity-log.entity';
import { User } from 'src/auth/entities/user.entity';
import { ActivityLogController } from './controllers/activity-log.controller';
import { ActivityLogService } from './services/activity-log.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityLog, User]),
  ],
  controllers: [ActivityLogController],
  providers: [ActivityLogService],
  exports: [ActivityLogService, TypeOrmModule],
})
export class ActivityLogModule {} 