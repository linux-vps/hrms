import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare const ACTIVITY_KEY = "activity";
export declare const LogActivity: (action: string, entityType?: string) => (target: any, key?: string, descriptor?: any) => any;
export interface ActivityData {
    action: string;
    entityType?: string;
    entityId?: string;
}
export declare class ActivityLoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
