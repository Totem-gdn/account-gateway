import * as path from 'path';
import { Controller, Get, Render, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ItchioGuard } from './guards/itch-io.guard.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { APP_NAMESPACE, IAppConfig } from '../../../configuration/app/app.config';

@Controller('auth/itch-io')
export class ItchIoController {
  constructor(private readonly jwtAuthService: JwtAuthService, private configService: ConfigService) {}

  @Get()
  @UseGuards(ItchioGuard)
  async itchioAuth() {
    // Guard redirects
  }

  @Get('callback')
  @Render('auth/itch-io/callback')
  async itchioCallback() {
    const appCfg = this.configService.get<IAppConfig>(APP_NAMESPACE);
    const redirectURL = new URL(appCfg.baseUrl);
    redirectURL.pathname = path.join(redirectURL.pathname, 'auth/itch-io/redirect');
    return { redirectURL: redirectURL.toString() };
  }

  @Get('redirect')
  @UseGuards(ItchioGuard)
  async itchioRedirect(@Req() req, @Res() res: Response) {
    if (!req.user?.profile) {
      throw new UnauthorizedException();
    }
    const { profile, state } = req.user;
    const accessToken = await this.jwtAuthService.createToken({
      sub: profile.id,
      provider: profile.provider,
      username: profile.username,
    });
    if (!!state?.redirectTo) {
      const resultJson = JSON.stringify({ profile, accessToken });
      const url = new URL(state.redirectTo);
      url.searchParams.append('result', Buffer.from(resultJson, 'utf8').toString('base64url'));
      return res.redirect(302, url.toString());
    } else {
      return res.json({ profile, accessToken });
    }
  }
}
