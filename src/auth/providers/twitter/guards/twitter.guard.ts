import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class TwitterGuard extends AuthGuard('twitter') {
  getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions {
    const options: IAuthModuleOptions = {};
    const request = context.switchToHttp().getRequest<Request & { session: { state: any } }>();
    if (request.path === '/auth/twitter') {
      if (Object.keys(request.query).length > 0) {
        request.session.state = request.query;
      }
    }
    return options;
  }
}
