import { registerAs } from '@nestjs/config';

export const KEYS_SERVICE_NAMESPACE = 'keys-service';

export interface IKeysServiceConfig {
  grpc: {
    host: string;
    port: string;
  };
}

export default registerAs(
  KEYS_SERVICE_NAMESPACE,
  (): IKeysServiceConfig => ({
    grpc: {
      host: process.env.KEYS_SERVICE_HOST,
      port: process.env.KEYS_SERVICE_PORT,
    },
  }),
);
