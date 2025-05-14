import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan } from 'typeorm';
import { OtpEntity } from '../shared/models/otp.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  constructor(
    @InjectRepository(OtpEntity)
    private otpRepository: Repository<OtpEntity>,
    private mailService: MailService,
  ) {}

  /**
   * Tạo mã OTP ngẫu nhiên 6 chữ số
   */
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Tạo mã OTP mới cho nhân viên
   */
  async createOtp(employeeId: string, email: string, fullName: string): Promise<string> {
    // Xóa OTP cũ chưa sử dụng của nhân viên này (nếu có)
    await this.otpRepository.delete({
      employeeId,
      isUsed: false,
    });

    // Tạo OTP mới
    const otp = this.generateOtp();
    
    // Thời gian hết hạn: 15 phút từ hiện tại
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    // Lưu OTP vào database
    const otpEntity = this.otpRepository.create({
      employeeId,
      email,
      otp,
      expiresAt,
    });

    await this.otpRepository.save(otpEntity);

    // Gửi email OTP
    const sent = await this.mailService.sendOtpEmail(email, fullName, otp);

    if (sent) {
      this.logger.log(`OTP sent to ${email} for employee ${employeeId}`);
      return otp;
    } else {
      throw new Error('Failed to send OTP email');
    }
  }

  /**
   * Xác thực mã OTP
   */
  async verifyOtp(employeeId: string, otpCode: string): Promise<boolean> {
    const now = new Date();

    // Tìm OTP trong database
    const otpEntity = await this.otpRepository.findOne({
      where: {
        employeeId,
        otp: otpCode,
        isUsed: false,
        expiresAt: MoreThan(now),
      },
    });

    if (!otpEntity) {
      return false;
    }

    // Đánh dấu OTP đã sử dụng
    otpEntity.isUsed = true;
    await this.otpRepository.save(otpEntity);

    return true;
  }

  /**
   * Xóa OTP đã hết hạn
   */
  async cleanupExpiredOtps(): Promise<number> {
    const now = new Date();
    const result = await this.otpRepository.delete({
      expiresAt: LessThan(now),
    });

    this.logger.log(`Cleaned up ${result.affected} expired OTPs`);
    return result.affected;
  }
} 