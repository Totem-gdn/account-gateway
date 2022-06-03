import { registerAs } from '@nestjs/config';

export const APP_NAMESPACE = 'app';

export interface IAppConfig {
  env: string;
  port: number | null;
  baseUrl: string;
}

export default registerAs(
  APP_NAMESPACE,
  (): IAppConfig => ({
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || null,
    baseUrl: process.env.BASE_URL,
  }),
);
