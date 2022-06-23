import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Profile } from 'passport';
import { Strategy } from 'passport-twitter';
import { APP_NAMESPACE, IAppConfig } from '../../../../configuration/app/app.config';
import { AUTH_PROVIDERS_NAMESPACE, IAuthProvidersConfig } from '../../../../configuration/providers/providers.config';
import { IUserProfile } from '../../interfaces/user-profile.interface';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private readonly configService: ConfigService) {
    const appCfg = configService.get<IAppConfig>(APP_NAMESPACE);
    const authProvidersCfg = configService.get<IAuthProvidersConfig>(AUTH_PROVIDERS_NAMESPACE);

    super({
      consumerKey: authProvidersCfg.twitter.consumerKey,
      consumerSecret: authProvidersCfg.twitter.consumerSecret,
      callbackURL: `${appCfg.baseUrl}/auth/twitter/redirect`,
      includeEmail: true,
      store: true,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, token, tokenSecret, profile: Profile) {
    const user: IUserProfile = {
      id: profile.id,
      provider: profile.provider,
      username: profile.emails?.[0]?.value || profile.username,
    };
    return user;
  }
}
