import { Controller, Get, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { TwitterGuard } from './guards/twitter.guard';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';

@Controller('auth/twitter')
export class TwitterController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Get('')
  @UseGuards(TwitterGuard)
  async twitterAuth() {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(TwitterGuard)
  async twitterRedirect(@Req() req, @Res() res) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    if (!!req.authInfo?.state) {
      const state = Buffer.from(req.authInfo.state, 'base64url').toString('utf8');
      req.user.state = JSON.parse(state);
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
