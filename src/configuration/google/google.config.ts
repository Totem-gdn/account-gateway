import { registerAs } from '@nestjs/config';

export const GOOGLE_NAMESPACE = 'google';

export interface IGoogleConfig {
  clientId: string;
  secret: string;
}

export default registerAs(
  GOOGLE_NAMESPACE,
  (): IGoogleConfig => ({
    clientId: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_SECRET,
  }),
);
