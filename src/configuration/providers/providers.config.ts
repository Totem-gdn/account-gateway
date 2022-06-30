import { registerAs } from '@nestjs/config';

export const AUTH_PROVIDERS_NAMESPACE = 'auth-providers';

export interface IAuthProvidersConfig {
  providers: string[];
  google: {
    clientID: string;
    clientSecret: string;
  };
  facebook: {
    appID: string;
    appSecret: string;
  };
  twitter: {
    consumerKey: string;
    consumerSecret: string;
  };
  steam: {
    apiKey: string;
  };
  itchio: {
    clientID: string;
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
      appID: process.env.FACEBOOK_APP_ID,
      appSecret: process.env.FACEBOOK_APP_SECRET,
    },
    twitter: {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    },
    steam: {
      apiKey: process.env.STEAM_API_KEY,
    },
    itchio: {
      clientID: process.env.ITCHIO_CLIENT_ID,
    },
  }),
);
