import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

/**
 * Metadata key để đánh dấu loại hoạt động
 */
export const ACTIVITY_KEY = 'activity';

/**
 * Decorator để đánh dấu loại hoạt động
 * @param action Mô tả hoạt động
 * @param entityType Loại entity (tùy chọn)
 */
export const LogActivity = (action: string, entityType?: string) => {
  return (target: any, key?: string, descriptor?: any) => {
    Reflect.defineMetadata(
      ACTIVITY_KEY,
      { action, entityType },
      descriptor.value,
    );
    return descriptor;
  };
};

/**
 * Interface mô tả hoạt động
 */
export interface ActivityData {
  action: string;
  entityType?: string;
  entityId?: string;
}

/**
 * Interceptor ghi log hoạt động
 */
@Injectable()
export class ActivityLoggerInterceptor implements NestInterceptor {
  /**
   * Xử lý request và response để ghi log hoạt động
   * @param context Context thực thi
   * @param next Handler xử lý tiếp theo
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { user } = request as any;
    
    // Bỏ qua nếu không có người dùng
    if (!user) {
      return next.handle();
    }

    const activityMetadata = Reflect.getMetadata(
      ACTIVITY_KEY,
      context.getHandler(),
    ) as ActivityData;

    // Bỏ qua nếu không có metadata hoạt động
    if (!activityMetadata) {
      return next.handle();
    }

    return next.handle().pipe(
      tap((data) => {
        const entityId = request.params.id || (data?.id || data?.data?.id);

        // Ghi log hoạt động - trong implementation thực tế sẽ 
        // gọi service ActivityLog để lưu vào database
        const logData = {
          userId: user.id,
          action: activityMetadata.action,
          entityType: activityMetadata.entityType,
          entityId: entityId,
          timestamp: new Date(),
        };

        // Log cho mục đích debug
        console.log('Activity Log:', logData);

        // Thực tế sẽ gọi service để lưu log vào database
        // this.activityLogService.create(logData);
      }),
    );
  }
} 