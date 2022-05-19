import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { KeysStorageService, Profile, User, PublicKey } from './interfaces/keys.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KeysService implements OnModuleInit {
  private keysStorageService: KeysStorageService;

  constructor(@Inject('KEYS_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.keysStorageService = this.client.getService<KeysStorageService>('KeysStorageService');
  }

  findOneOrCreate(profile: Profile): Promise<User> {
    return firstValueFrom<User>(this.keysStorageService.FindOneOrCreate(profile));
  }

  getPublicKey(user: User): Promise<PublicKey> {
    return firstValueFrom<PublicKey>(this.keysStorageService.GetPublicKey(user));
  }
}
