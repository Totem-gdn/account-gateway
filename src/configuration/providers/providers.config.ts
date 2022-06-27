import { registerAs } from '@nestjs/config';

export const AUTH_PROVIDERS_NAMESPACE = 'auth-providers';

export interface IAuthProvidersConfig {
  providers: string[];
  google: {
    clientID: string;
    clientSecret: string;
  };
  facebook: {
    AppID: string;
    AppSecret: string;
  };
  twitter: {
    consumerKey: string;
    consumerSecret: string;
  };
  steam: {
    apiKey: string;
  };
}

export function authProviders(): string[] {
  return process.env.AUTH_PROVIDERS?.split(',') || [];
}

export default registerAs(
  AUTH_PROVIDERS_NAMESPACE,
  (): IAuthProvidersConfig => ({
    providers: process.env.AUTH_PROVIDERS?.split(',') || [],
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    facebook: {
      AppID: process.env.FACEBOOK_APP_ID,
      AppSecret: process.env.FACEBOOK_APP_SECRET,
    },
    twitter: {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    },
    steam: {
      apiKey: process.env.STEAM_API_KEY,
    },
  }),
);
