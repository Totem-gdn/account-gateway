import { registerAs } from '@nestjs/config';

export const TWITTER_NAMESPACE = 'twitter';

export interface ITwitterConfig {
  consumerKey: string;
  consumerSecret: string;
}

export default registerAs(
  TWITTER_NAMESPACE,
  (): ITwitterConfig => ({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  }),
);
