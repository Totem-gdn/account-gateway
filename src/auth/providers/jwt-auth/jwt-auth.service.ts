import { Injectable } from '@nestjs/common';
import { KeystoreService } from '../../../keystore/keystore.service';
import { JwtService } from '@nestjs/jwt';
import { FindOrCreateRequest } from '../../../keystore/interfaces/keystore-service.interface';
import { IJwtPayload } from './interfaces/jwt.payload.interface';

@Injectable()
export class JwtAuthService {
  constructor(private readonly keystoreService: KeystoreService, private readonly jwtService: JwtService) {}

  async findOneOrCreate(user: FindOrCreateRequest) {
    const { id } = await this.keystoreService.findOneOrCreate(user);
    const profile: FindOrCreateRequest = {
      id,
      provider: user.provider,
      username: user.username,
    };
    const accessToken = await this.createToken(profile);
    return { profile, accessToken };
  }

  private async createToken(profile: FindOrCreateRequest): Promise<string> {
    const jwtPayload: IJwtPayload = {
      sub: profile.id,
      provider: profile.provider,
      username: profile.username,
    };
    return await this.jwtService.signAsync(jwtPayload);
  }
}
