import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { APP_NAMESPACE, IAppConfig } from '../../../../configuration/app/app.config';
import { Profile as KeysProfile } from '../../../../keys/interfaces/keys.interface';
import { AUTH_PROVIDERS_NAMESPACE, IAuthProvidersConfig } from '../../../../configuration/providers/providers.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    const appCfg = configService.get<IAppConfig>(APP_NAMESPACE);
    const authProvidersCfg = configService.get<IAuthProvidersConfig>(AUTH_PROVIDERS_NAMESPACE);

    super({
      clientID: authProvidersCfg.google.clientID,
      clientSecret: authProvidersCfg.google.clientSecret,
      callbackURL: `${appCfg.baseUrl}/auth/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
    const user: KeysProfile = {
      provider: profile.provider,
      id: profile.id,
      username: profile.emails[0]?.value,
    };

    done(null, user);
  }
}
