import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LoggedInUser } from './logged-in-user.interface';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user as LoggedInUser;
  },
);
