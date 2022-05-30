import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  FindOrCreateRequest,
  FindOrCreateResponse,
  PublicKeyRequest,
  PublicKeyResponse,
  Users,
} from './interfaces/keystore-service.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KeystoreService implements OnModuleInit {
  private keysStorageService: Users;

  constructor(@Inject('USERS_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.keysStorageService = this.client.getService<Users>('Users');
  }

  async findOneOrCreate(profile: FindOrCreateRequest): Promise<FindOrCreateResponse> {
    return firstValueFrom<FindOrCreateResponse>(this.keysStorageService.FindOrCreate(profile));
  }

  async getPublicKey(user: PublicKeyRequest): Promise<PublicKeyResponse> {
    return firstValueFrom<PublicKeyResponse>(this.keysStorageService.GetPublicKey(user));
  }
}
