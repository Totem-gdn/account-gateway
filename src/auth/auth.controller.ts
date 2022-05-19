import { Controller, UseGuards, Get, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleGuard } from './guards/google.guard';
import { TwitterGuard } from './guards/twitter.guard';
import { FacebookGuard } from './guards/facebook.guard';
import { Profile } from '../keys/interfaces/keys.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleGuard)
  async googleAuth() {
    // Guard redirects
  }

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  async googleRedirect(@Req() req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    return await this.authService.findOneOrCreate(req.user as Profile);
  }

  @Get('twitter')
  @UseGuards(TwitterGuard)
  async twitterAuth() {
    // Guard redirects
  }

  @Get('twitter/redirect')
  @UseGuards(TwitterGuard)
  async twitterRedirect(@Req() req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    return await this.authService.findOneOrCreate(req.user as Profile);
  }

  @Get('facebook')
  @UseGuards(FacebookGuard)
  async facebookAuth() {
    // Guard redirects
  }

  @Get('facebook/redirect')
  @UseGuards(FacebookGuard)
  async facebookRedirect(@Req() req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    return await this.authService.findOneOrCreate(req.user as Profile);
  }
}
