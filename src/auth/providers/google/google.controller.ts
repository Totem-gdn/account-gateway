import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
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
  async googleRedirect(@Req() req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return await this.jwtAuthService.findOneOrCreate(req.user);
  }
}
