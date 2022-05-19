import { Injectable } from '@nestjs/common';
import { KeysService } from '../keys/keys.service';
import { PublicKey, User } from '../keys/interfaces/keys.interface';

@Injectable()
export class UserService {
  constructor(private readonly keysService: KeysService) {}

  async getPublicKey(user: User): Promise<PublicKey> {
    return await this.keysService.getPublicKey(user);
  }
}
