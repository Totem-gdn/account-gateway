import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { KeystoreService } from '../../../../keystore/keystore.service';
import { Request } from 'express';
import { Profile, Strategy } from 'passport-google-oauth20';
import { APP_NAMESPACE, IAppConfig } from '../../../../configuration/app/app.config';
import { AUTH_PROVIDERS_NAMESPACE, IAuthProvidersConfig } from '../../../../configuration/providers/providers.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService, private readonly keystoreService: KeystoreService) {
    const appCfg = configService.get<IAppConfig>(APP_NAMESPACE);
    const authProvidersCfg = configService.get<IAuthProvidersConfig>(AUTH_PROVIDERS_NAMESPACE);
    const callbackURL = new URL(appCfg.baseUrl);
    callbackURL.pathname = path.join(callbackURL.pathname, 'auth/google/redirect');

    super({
      clientID: authProvidersCfg.google.clientID,
      clientSecret: authProvidersCfg.google.clientSecret,
      callbackURL: callbackURL.toString(),
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(req: Request, accessToken: string, refreshToken: string, profile: Profile) {
    if (!profile) {
      return null;
    }
    const player = await this.keystoreService.findOneOrCreate({
      id: profile.id,
      provider: profile.provider,
    });
    return {
      profile: {
        id: player.id,
        provider: profile.provider,
        username: profile.emails?.[0]?.value || profile.username,
      },
      state: req.query?.state
        ? JSON.parse(Buffer.from(req.query.state as string, 'base64url').toString('utf8'))
        : undefined,
    };
  }
}
