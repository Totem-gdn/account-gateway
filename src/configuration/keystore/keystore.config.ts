import { registerAs } from '@nestjs/config';

export const KEYSTORE_SERVICE_NAMESPACE = 'keystore-service';

export interface IKeystoreServiceConfig {
  grpc: {
    host: string;
    port: string;
  };
}

export default registerAs(
  KEYSTORE_SERVICE_NAMESPACE,
  (): IKeystoreServiceConfig => ({
    grpc: {
      host: process.env.KEYSTORE_HOST,
      port: process.env.KEYSTORE_PORT,
    },
  }),
);
