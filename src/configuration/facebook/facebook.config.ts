import { registerAs } from '@nestjs/config';

export const FACEBOOK_NAMESPACE = 'facebook';

export interface IFacebookConfig {
  AppID: string;
  AppSecret: string;
}

export default registerAs(
  FACEBOOK_NAMESPACE,
  (): IFacebookConfig => ({
    AppID: process.env.FACEBOOK_APP_ID,
    AppSecret: process.env.FACEBOOK_APP_SECRET,
  }),
);
