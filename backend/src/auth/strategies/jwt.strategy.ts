import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

/**
 * Payload của JWT token
 */
interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  employeeId?: string;
}

/**
 * Strategy xác thực JWT
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET', 'quanlynhansu_jwt_secret_key'),
      ignoreExpiration: false,
    });
  }

  /**
   * Xác thực token JWT
   * @param payload Payload từ token
   * @returns Thông tin người dùng
   */
  async validate(payload: JwtPayload) {
    const { sub: id } = payload;
    
    // Kiểm tra người dùng tồn tại
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('Token không hợp lệ');
    }
    
    // Trả về thông tin người dùng để lưu trong request
    return payload;
  }
} 