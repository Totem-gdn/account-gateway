import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Profile } from 'passport';
import { Strategy } from 'passport-steam';
import { APP_NAMESPACE, IAppConfig } from '../../../../configuration/app/app.config';
import { AUTH_PROVIDERS_NAMESPACE, IAuthProvidersConfig } from '../../../../configuration/providers/providers.config';
import { IUserProfile } from '../../interfaces/user-profile.interface';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
  constructor(private readonly configService: ConfigService) {
    const appCfg = configService.get<IAppConfig>(APP_NAMESPACE);
    const authProviderCfg = configService.get<IAuthProvidersConfig>(AUTH_PROVIDERS_NAMESPACE);

    super({
      returnURL: `${appCfg.baseUrl}/auth/steam/redirect`,
      realm: appCfg.baseUrl,
      apiKey: authProviderCfg.steam.apiKey,
      stateless: false,
      profile: true,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, identifier, profile: Profile) {
    if (!profile) {
      return null;
    }
    const user: IUserProfile = {
      id: profile.id,
      provider: profile.provider,
      username: profile.displayName,
    };
    return user;
  }
}
