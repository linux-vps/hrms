import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpService } from './otp.service';
import { OtpEntity } from '../shared/models/otp.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OtpEntity]),
    MailModule,
  ],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {} 