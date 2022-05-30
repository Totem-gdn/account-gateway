import { registerAs } from '@nestjs/config';

export const AUTH_PROVIDERS_NAMESPACE = 'auth-providers';

export const AuthProviders = ['google', 'facebook', 'twitter'] as const;

export type AuthProvider = typeof AuthProviders[number];

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
}

// FIXME: right now we can't dynamically create proxy module
// https://github.com/nestjs/nest/pull/9534
export function isProviderEnabled(provider: AuthProvider): boolean {
  const envProviders = process.env.AUTH_PROVIDERS?.split(',') || [];
  return envProviders.includes(provider);
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
  }),
);
