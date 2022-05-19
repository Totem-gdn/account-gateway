import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt.payload.interface';
import { Profile } from '../keys/interfaces/keys.interface';
import { KeysService } from '../keys/keys.service';

@Injectable()
export class AuthService {
  constructor(private readonly keysService: KeysService, private readonly jwtService: JwtService) {}

  async findOneOrCreate(user: Profile) {
    const { id } = await this.keysService.findOneOrCreate(user);
    const profile: Profile = {
      provider: user.provider,
      id,
      username: user.username,
    };
    const accessToken = await this.createToken(profile);
    return { profile, accessToken };
  }

  private async createToken(profile: Profile): Promise<string> {
    const jwtPayload: IJwtPayload = {
      sub: profile.id,
      provider: profile.provider,
      username: profile.username,
    };
    return await this.jwtService.signAsync(jwtPayload);
  }
}
