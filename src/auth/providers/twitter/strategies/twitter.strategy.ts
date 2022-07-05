import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { KeystoreService } from '../../../../keystore/keystore.service';
import { Request } from 'express';
import { Profile } from 'passport';
import { Strategy } from 'passport-twitter';
import { APP_NAMESPACE, IAppConfig } from '../../../../configuration/app/app.config';
import { AUTH_PROVIDERS_NAMESPACE, IAuthProvidersConfig } from '../../../../configuration/providers/providers.config';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private readonly configService: ConfigService, private readonly keystoreService: KeystoreService) {
    const appCfg = configService.get<IAppConfig>(APP_NAMESPACE);
    const authProvidersCfg = configService.get<IAuthProvidersConfig>(AUTH_PROVIDERS_NAMESPACE);
    const callbackURL = new URL(appCfg.baseUrl);
    callbackURL.pathname = path.join(callbackURL.pathname, 'auth/twitter/redirect');

    super({
      consumerKey: authProvidersCfg.twitter.consumerKey,
      consumerSecret: authProvidersCfg.twitter.consumerSecret,
      callbackURL: callbackURL.toString(),
      includeEmail: true,
      store: true,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, token, tokenSecret, profile: Profile) {
    const state = req.session?.state;
    if (state) {
      // cleanup request state
      delete req.session.state;
    }
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
      state,
    };
  }
}
