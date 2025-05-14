import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

export interface CurrentUserInfo {
  id: string;
  role: string;
  departmentId?: string;
}

export const CurrentUser = createParamDecorator(
  (data: keyof CurrentUserInfo | undefined, ctx: ExecutionContext): CurrentUserInfo | any => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return null;
    }

    const currentUser: CurrentUserInfo = {
      id: user.sub || user.id,
      role: user.role,
      departmentId: user.departmentId,
    };

    return data ? currentUser[data] : currentUser;
  },
);
