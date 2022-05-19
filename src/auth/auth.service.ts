import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt.payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(profile: any): Promise<string> {
    const jwtPayload: IJwtPayload = {
      sub: profile.id,
      provider: profile.provider,
      username: profile.email,
    };
    return await this.jwtService.signAsync(jwtPayload);
  }
}
