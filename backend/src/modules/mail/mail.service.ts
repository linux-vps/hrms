import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    // Cấu hình Gmail đặc biệt
    if (this.configService.get<string>('MAIL_HOST') === 'smtp.gmail.com') {
      this.logger.log('Sử dụng cấu hình đặc biệt cho Gmail');
      
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.configService.get<string>('MAIL_USER'),
          pass: this.configService.get<string>('MAIL_PASSWORD'),
        },
      });
    } else {
      // Cấu hình SMTP thông thường cho các dịch vụ khác
      const mailConfig = {
        host: this.configService.get<string>('MAIL_HOST'),
        port: this.configService.get<number>('MAIL_PORT'),
        secure: this.configService.get<boolean>('MAIL_SECURE'),
        auth: {
          user: this.configService.get<string>('MAIL_USER'),
          pass: this.configService.get<string>('MAIL_PASSWORD'),
        },
        tls: {
          rejectUnauthorized: false
        }
      };
      
      this.logger.log(`Mail configuration: ${JSON.stringify({
        host: mailConfig.host,
        port: mailConfig.port,
        secure: mailConfig.secure,
        auth: {
          user: mailConfig.auth.user ? '***@***' : 'not set',
          pass: mailConfig.auth.pass ? '*****' : 'not set'
        }
      })}`);

      this.transporter = nodemailer.createTransport(mailConfig);
    }
    
    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        this.logger.error(`SMTP connection error: ${error.message}`);
      } else {
        this.logger.log('SMTP server connection established successfully');
      }
    });
  }

  private async compileTemplate(templateName: string, context: any): Promise<string> {
    try {
      // Thử các đường dẫn có thể
      const possiblePaths = [
        path.join(process.cwd(), 'src/templates/mail', `${templateName}.hbs`),
        path.join(process.cwd(), 'dist/src/templates/mail', `${templateName}.hbs`),
        path.join(__dirname, '../../templates/mail', `${templateName}.hbs`)
      ];
      
      let templatePath = '';
      let template = '';
      
      // Tìm file template ở các đường dẫn có thể
      for (const pathToTry of possiblePaths) {
        try {
          if (fs.existsSync(pathToTry)) {
            templatePath = pathToTry;
            template = fs.readFileSync(templatePath, 'utf8');
            this.logger.log(`Đã tìm thấy template tại: ${templatePath}`);
            break;
          }
        } catch (err) {
          // Tiếp tục với đường dẫn tiếp theo
        }
      }
      
      if (!template) {
        throw new Error(`Template '${templateName}' không tìm thấy ở tất cả các đường dẫn đã thử`);
      }
      
      const compiledTemplate = handlebars.compile(template);
      
      return compiledTemplate(context);
    } catch (error) {
      this.logger.error(`Error compiling template: ${error.message}`);
      throw error;
    }
  }

  async sendMail(to: string, subject: string, templateName: string, context: any): Promise<boolean> {
    try {
      const html = await this.compileTemplate(templateName, context);
      
      const mailOptions = {
        from: `"${this.configService.get<string>('MAIL_FROM_NAME')}" <${this.configService.get<string>('MAIL_FROM_ADDRESS')}>`,
        to,
        subject,
        html,
      };
      
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent: ${info.messageId}`);
      
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`);
      return false;
    }
  }

  async sendNewAccountEmail(to: string, fullName: string, password: string): Promise<boolean> {
    const subject = 'Thông tin tài khoản mới';
    const context = {
      fullName,
      email: to,
      password,
      loginUrl: this.configService.get<string>('FRONTEND_URL') + '/login'
    };
    
    return this.sendMail(to, subject, 'new-account', context);
  }

  async sendOtpEmail(to: string, fullName: string, otp: string): Promise<boolean> {
    const subject = 'Mã OTP đổi mật khẩu';
    const context = {
      fullName,
      otp,
      expireTime: '15 phút' // Thời gian OTP hết hạn
    };
    
    return this.sendMail(to, subject, 'otp', context);
  }

  async sendPasswordResetEmail(to: string, fullName: string, newPassword: string): Promise<boolean> {
    const subject = 'Mật khẩu mới của bạn';
    const context = {
      fullName,
      newPassword,
      loginUrl: this.configService.get<string>('FRONTEND_URL') + '/login'
    };
    
    return this.sendMail(to, subject, 'password-reset', context);
  }
} 