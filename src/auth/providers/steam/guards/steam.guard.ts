import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { Request } from 'express';

declare module 'express-session' {
  interface SessionData {
    state: any;
  }
}

@Injectable()
export class SteamGuard extends AuthGuard('steam') {
  getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions {
    const options: IAuthModuleOptions = {};
    const request = context.switchToHttp().getRequest<Request>();
    if (request.path === '/auth/steam') {
      if (Object.keys(request.query).length > 0) {
        request.session.state = request.query;
      }
    }
    return options;
  }
}
