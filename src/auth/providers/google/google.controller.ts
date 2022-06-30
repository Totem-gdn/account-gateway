import { Controller, Get, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GoogleGuard } from './guards/google.guard';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';

@Controller('auth/google')
export class GoogleController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleGuard)
  async googleAuth() {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(GoogleGuard)
  async googleRedirect(@Req() req, @Res() res: Response) {
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
