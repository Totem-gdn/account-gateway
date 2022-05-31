import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): any => {
  const req = ctx.switchToHttp().getRequest();
  return {
    id: req.user.sub,
    provider: req.user.provider,
    username: req.user.username,
  };
});
