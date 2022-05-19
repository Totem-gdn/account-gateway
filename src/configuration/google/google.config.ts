import { registerAs } from '@nestjs/config';

export const GOOGLE_NAMESPACE = 'google';

export interface IGoogleConfig {
  clientID: string;
  clientSecret: string;
}

export default registerAs(
  GOOGLE_NAMESPACE,
  (): IGoogleConfig => ({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
);
