import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../types/enums.type';

/**
 * Key metadata để đánh dấu các roles được phép truy cập
 */
export const ROLES_KEY = 'roles';

/**
 * Decorator đánh dấu roles có thể truy cập route
 */
export const Roles = (...roles: UserRole[]) => {
  return (target: any, key?: string, descriptor?: any) => {
    Reflect.defineMetadata(ROLES_KEY, roles, descriptor.value);
    return descriptor;
  };
};

/**
 * Guard kiểm tra vai trò của người dùng
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Kiểm tra xem người dùng có quyền truy cập không
   * @param context Context thực thi
   * @returns True nếu cho phép truy cập, false nếu không
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!user) {
      throw new ForbiddenException('Người dùng chưa được xác thực');
    }
    
    const hasRole = requiredRoles.some((role) => user.role === role);
    
    if (!hasRole) {
      throw new ForbiddenException('Bạn không có quyền truy cập tài nguyên này');
    }
    
    return true;
  }
} 