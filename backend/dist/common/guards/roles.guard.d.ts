import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../types/enums.type';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: UserRole[]) => (target: any, key?: string, descriptor?: any) => any;
export declare class RolesGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
}
