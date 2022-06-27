import { Injectable } from '@nestjs/common';
import { KeystoreService } from '../../../keystore/keystore.service';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt.payload.interface';

@Injectable()
export class JwtAuthService {
  constructor(private readonly keystoreService: KeystoreService, private readonly jwtService: JwtService) {}

  async createToken(payload: IJwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
