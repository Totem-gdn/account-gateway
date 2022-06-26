import { Controller, Get, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { SteamGuard } from './guards/steam.guard';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';

@Controller('auth/steam')
export class SteamController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Get('')
  @UseGuards(SteamGuard)
  async steamAuth() {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(SteamGuard)
  async steamRedirect(@Req() req, @Res() res: Response) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    const userProfile = await this.jwtAuthService.findOneOrCreate(req.user);
    if (!!req.session?.state?.redirectTo) {
      const url = new URL(req.session.state.redirectTo);
      url.searchParams.append('result', Buffer.from(JSON.stringify(userProfile), 'utf8').toString('base64url'));
      return res.redirect(302, url.toString());
    } else {
      return res.json(userProfile);
    }
  }
}
