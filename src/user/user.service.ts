import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async profile(currentUser: any): Promise<any> {
    const user = { ...currentUser, publicKey: '<pk>' };
    return { user };
  }
}
