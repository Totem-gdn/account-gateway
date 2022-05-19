import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { APP_NAMESPACE, IAppConfig } from '../../configuration/app/app.config';
import { GOOGLE_NAMESPACE, IGoogleConfig } from '../../configuration/google/google.config';
import { Profile as KeysProfile } from '../../keys/interfaces/keys.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    const appCfg = configService.get<IAppConfig>(APP_NAMESPACE);
    const googleCfg = configService.get<IGoogleConfig>(GOOGLE_NAMESPACE);

    super({
      clientID: googleCfg.clientID,
      clientSecret: googleCfg.clientSecret,
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
