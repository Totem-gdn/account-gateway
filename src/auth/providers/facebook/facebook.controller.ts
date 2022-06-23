import { Controller, Get, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { FacebookGuard } from './guards/facebook.guard';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';

@Controller('auth/facebook')
export class FacebookController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(FacebookGuard)
  async facebookAuth() {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(FacebookGuard)
  async facebookRedirect(@Req() req, @Res() res) {
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
