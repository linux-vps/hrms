import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './entities/feed.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feed]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class FeedModule {} 