import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
  getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions {
    const options: IAuthModuleOptions = {};
    const request = context.switchToHttp().getRequest<Request>();
    if (request.path === '/auth/google') {
      if (Object.keys(request.query).length > 0) {
        options.state = Buffer.from(JSON.stringify(request.query), 'utf8').toString('base64url');
      }
    }
    return options;
  }
}
