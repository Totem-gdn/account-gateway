import * as path from 'path';
import { Controller, Get, HttpCode, Post, Render, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ItchioGuard } from './guards/itch-io.guard.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { APP_NAMESPACE, IAppConfig } from '../../../configuration/app/app.config';

@Controller('auth/itch-io')
export class ItchIoController {
  private readonly authURL: URL;

  constructor(private readonly jwtAuthService: JwtAuthService, private configService: ConfigService) {
    this.authURL = new URL(this.configService.get<IAppConfig>(APP_NAMESPACE).baseUrl);
    this.authURL.pathname = path.join(this.authURL.pathname, 'auth/itch-io/redirect');
  }

  @Get()
  @UseGuards(ItchioGuard)
  async itchioAuth() {
    // Guard redirects
  }

  @Get('redirect')
  @Render('auth/itch-io/redirect')
  async itchioCallback() {
    return { authURL: this.authURL.toString() };
  }

  @Post('redirect')
  @UseGuards(ItchioGuard)
  @HttpCode(200)
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
