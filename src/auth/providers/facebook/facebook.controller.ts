import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
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
  async facebookRedirect(@Req() req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return await this.jwtAuthService.findOneOrCreate(req.user);
  }
}
