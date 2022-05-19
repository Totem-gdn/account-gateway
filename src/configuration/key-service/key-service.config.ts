import { registerAs } from '@nestjs/config';

export const KEY_SERVICE_NAMESPACE = 'key-service';

export interface IKeyServiceConfig {
  grpc: {
    host: string;
    port: string;
  };
}

export default registerAs(
  KEY_SERVICE_NAMESPACE,
  (): IKeyServiceConfig => ({
    grpc: {
      host: process.env.KEY_SERVICE_HOST,
      port: process.env.KEY_SERVICE_PORT,
    },
  }),
);
