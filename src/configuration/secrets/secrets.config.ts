import { registerAs } from '@nestjs/config';

export const SECRETS_NAMESPACE = 'secrets';

export interface ISecretsConfig {
  redisStorageURI: string;
  sessionSecret: string;
  jwtSecret: string;
}

export function useRedisStorage() {
  return !!process.env.REDIS_STORAGE_URI;
}

export default registerAs(
  SECRETS_NAMESPACE,
  (): ISecretsConfig => ({
    redisStorageURI: process.env.REDIS_STORAGE_URI,
    sessionSecret: process.env.SESSION_SECRET,
    jwtSecret: process.env.JWT_SECRET,
  }),
);
