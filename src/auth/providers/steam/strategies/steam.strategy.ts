import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { KeystoreService } from '../../../../keystore/keystore.service';
import { Request } from 'express';
import { Profile } from 'passport';
import { Strategy } from 'passport-steam';
import { APP_NAMESPACE, IAppConfig } from '../../../../configuration/app/app.config';
import { AUTH_PROVIDERS_NAMESPACE, IAuthProvidersConfig } from '../../../../configuration/providers/providers.config';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
  constructor(private readonly configService: ConfigService, private readonly keystoreService: KeystoreService) {
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
      username: profile.id, // steam doesn't return email. only id field can be used as unique identifier
    });
    return {
      profile: {
        id: player.id,
        provider: profile.provider,
        username: profile.displayName,
      },
      state,
    };
  }
}
