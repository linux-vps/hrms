"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLoggerInterceptor = exports.LogActivity = exports.ACTIVITY_KEY = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
exports.ACTIVITY_KEY = 'activity';
const LogActivity = (action, entityType) => {
    return (target, key, descriptor) => {
        Reflect.defineMetadata(exports.ACTIVITY_KEY, { action, entityType }, descriptor.value);
        return descriptor;
    };
};
exports.LogActivity = LogActivity;
let ActivityLoggerInterceptor = class ActivityLoggerInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { user } = request;
        if (!user) {
            return next.handle();
        }
        const activityMetadata = Reflect.getMetadata(exports.ACTIVITY_KEY, context.getHandler());
        if (!activityMetadata) {
            return next.handle();
        }
        return next.handle().pipe((0, rxjs_1.tap)((data) => {
            const entityId = request.params.id || (data?.id || data?.data?.id);
            const logData = {
                userId: user.id,
                action: activityMetadata.action,
                entityType: activityMetadata.entityType,
                entityId: entityId,
                timestamp: new Date(),
            };
            console.log('Activity Log:', logData);
        }));
    }
};
exports.ActivityLoggerInterceptor = ActivityLoggerInterceptor;
exports.ActivityLoggerInterceptor = ActivityLoggerInterceptor = __decorate([
    (0, common_1.Injectable)()
], ActivityLoggerInterceptor);
//# sourceMappingURL=activity-logger.interceptor.js.map