import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class ItchioGuard extends AuthGuard('itch-io') {
  getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions {
    const options: IAuthModuleOptions = {};
    const request = context.switchToHttp().getRequest<Request>();
    if (request.path === '/auth/itch-io') {
      if (Object.keys(request.query).length > 0) {
        const stateJson = JSON.stringify(request.query);
        options.state = Buffer.from(stateJson, 'utf8').toString('base64url');
      }
    }
    return options;
  }
}
