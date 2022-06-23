import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Profile, Strategy } from 'passport-google-oauth20';
import { APP_NAMESPACE, IAppConfig } from '../../../../configuration/app/app.config';
import { AUTH_PROVIDERS_NAMESPACE, IAuthProvidersConfig } from '../../../../configuration/providers/providers.config';
import { IUserProfile } from '../../interfaces/user-profile.interface';

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
      passReqToCallback: true,
    });
  }

  async validate(req: Request, accessToken: string, refreshToken: string, profile: Profile) {
    if (!profile) {
      return null;
    }
    const user: IUserProfile = {
      id: profile.id,
      provider: profile.provider,
      username: profile.emails?.[0]?.value || profile.username,
    };
    if (!!req.query?.state) {
      const state = Buffer.from(req.query.state as string, 'base64url').toString('utf8');
      user.state = JSON.parse(state);
    }
    return user;
  }
}
