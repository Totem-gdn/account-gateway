import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
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
  async twitterRedirect(@Req() req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return await this.jwtAuthService.findOneOrCreate(req.user);
  }
}
