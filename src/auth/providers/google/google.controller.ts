import { Controller, Get, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GoogleGuard } from './guards/google.guard';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';

@Controller('auth/google')
export class GoogleController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Get('')
  @UseGuards(GoogleGuard)
  async googleAuth() {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(GoogleGuard)
  async googleRedirect(@Req() req, @Res() res: Response) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    const userProfile = await this.jwtAuthService.findOneOrCreate(req.user);
    if (!!req.user.state?.redirectTo) {
      const url = new URL(req.user.state.redirectTo);
      url.searchParams.append('result', Buffer.from(JSON.stringify(userProfile), 'utf8').toString('base64url'));
      return res.redirect(302, url.toString());
    } else {
      return res.json(userProfile);
    }
  }
}
