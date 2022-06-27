import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): any => {
  const req = ctx.switchToHttp().getRequest<Request>();
  return {
    id: req.user.sub,
    provider: req.user.provider,
    username: req.user.username,
  };
});
