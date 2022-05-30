import { Injectable } from '@nestjs/common';
import { KeysService } from '../../../keys/keys.service';
import { JwtService } from '@nestjs/jwt';
import { Profile } from '../../../keys/interfaces/keys.interface';
import { IJwtPayload } from './interfaces/jwt.payload.interface';

@Injectable()
export class JwtAuthService {
  constructor(private readonly keysService: KeysService, private readonly jwtService: JwtService) {}

  async findOneOrCreate(user: Profile) {
    const { id } = await this.keysService.findOneOrCreate(user);
    const profile: Profile = {
      id,
      provider: user.provider,
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
