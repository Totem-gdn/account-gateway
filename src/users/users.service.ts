import { Injectable } from '@nestjs/common';
import { KeystoreService } from '../keystore/keystore.service';
import { PublicKeyRequest, PublicKeyResponse } from '../keystore/interfaces/keystore-service.interface';

@Injectable()
export class UsersService {
  constructor(private readonly keystoreService: KeystoreService) {}

  async getPublicKey(user: PublicKeyRequest): Promise<PublicKeyResponse> {
    return await this.keystoreService.getPublicKey(user);
  }
}
