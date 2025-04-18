import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * Guard xác thực JWT cho các route cần bảo vệ
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * Kiểm tra xem route có cần xác thực không
   * @param context Context thực thi
   * @returns True nếu cho phép truy cập, false nếu không
   */
  canActivate(context: ExecutionContext) {
    // Kiểm tra nếu route được đánh dấu là public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // Nếu không phải public, thực hiện xác thực JWT
    return super.canActivate(context);
  }

  /**
   * Xử lý khi xác thực thất bại
   * @param error Lỗi xác thực
   */
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Bạn không có quyền truy cập vào tài nguyên này');
    }
    return user;
  }
} 