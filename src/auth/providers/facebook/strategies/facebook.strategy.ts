import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, Profile } from 'passport-facebook';
import { APP_NAMESPACE, IAppConfig } from '../../../../configuration/app/app.config';
import { AUTH_PROVIDERS_NAMESPACE, IAuthProvidersConfig } from '../../../../configuration/providers/providers.config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly configService: ConfigService) {
    const appCfg = configService.get<IAppConfig>(APP_NAMESPACE);
    const authProvidersConfig = configService.get<IAuthProvidersConfig>(AUTH_PROVIDERS_NAMESPACE);

    super({
      clientID: authProvidersConfig.facebook.AppID,
      clientSecret: authProvidersConfig.facebook.AppSecret,
      callbackURL: `${appCfg.baseUrl}/auth/facebook/redirect`,
      profileFields: ['id', 'displayName', 'emails'],
      scope: ['email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done): Promise<any> {
    const user = {
      id: profile.id,
      provider: profile.provider,
      username: profile.emails[0]?.value,
    };
    done(null, user);
  }
}
