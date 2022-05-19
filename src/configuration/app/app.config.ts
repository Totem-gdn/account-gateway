import { registerAs } from '@nestjs/config';

export const APP_NAMESPACE = 'app';

export interface IAppConfig {
  schema: string;
  host: string;
  port: number;
}

export default registerAs(
  APP_NAMESPACE,
  (): IAppConfig => ({
    schema: process.env.SCHEMA || 'http',
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT, 10) || 3000,
  }),
);
