import { Observable } from 'rxjs';

export interface FindOrCreateRequest {
  id: string;
  provider: string;
}

export interface FindOrCreateResponse {
  id: string;
}

export interface PublicKeyRequest {
  id: string;
}

export interface PublicKeyResponse {
  publicKey: string;
}

export interface Users {
  FindOrCreate(profile: FindOrCreateRequest): Observable<FindOrCreateResponse>;
  GetPublicKey(user: PublicKeyRequest): Observable<PublicKeyResponse>;
}
