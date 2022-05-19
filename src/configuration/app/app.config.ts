import { registerAs } from '@nestjs/config';

export const APP_NAMESPACE = 'app';

export interface IAppConfig {
  port: number | null;
  baseUrl: string;
}

export default registerAs(
  APP_NAMESPACE,
  (): IAppConfig => ({
    port: parseInt(process.env.PORT, 10) || null,
    baseUrl: process.env.BASE_URL,
  }),
);
