import { Observable } from 'rxjs';

export interface Profile {
  provider: string;
  id: string;
  username: string;
}

export interface User {
  id: string;
}

export interface PublicKey {
  publicKey: string;
}

export interface KeysStorageService {
  FindOneOrCreate(profile: Profile): Observable<User>;
  GetPublicKey(user: User): Observable<PublicKey>;
}
