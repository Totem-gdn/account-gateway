import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, Profile } from 'passport-facebook';
import { APP_NAMESPACE, IAppConfig } from '../../configuration/app/app.config';
import { FACEBOOK_NAMESPACE, IFacebookConfig } from '../../configuration/facebook/facebook.config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly configService: ConfigService) {
    const appCfg = configService.get<IAppConfig>(APP_NAMESPACE);
    const facebookCfg = configService.get<IFacebookConfig>(FACEBOOK_NAMESPACE);

    super({
      clientID: facebookCfg.AppID,
      clientSecret: facebookCfg.AppSecret,
      callbackURL: `${appCfg.baseUrl}/auth/facebook/redirect`,
      profileFields: ['id', 'displayName', 'emails'],
      scope: ['email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done): Promise<any> {
    const user = {
      provider: 'facebook',
      id: profile.id,
      username: profile.emails[0]?.value,
    };
    done(null, user);
  }
}
