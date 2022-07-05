import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { KeystoreService } from '../../../../keystore/keystore.service';
import { Request } from 'express';
import { Profile } from 'passport';
import { PassportItchioStrategy } from './passport-itch-io';
import { APP_NAMESPACE, IAppConfig } from '../../../../configuration/app/app.config';
import { AUTH_PROVIDERS_NAMESPACE, IAuthProvidersConfig } from '../../../../configuration/providers/providers.config';

@Injectable()
export class ItchIoStrategy extends PassportStrategy(PassportItchioStrategy, 'itch-io') {
  constructor(private readonly configService: ConfigService, private readonly keystoreService: KeystoreService) {
    const appCfg = configService.get<IAppConfig>(APP_NAMESPACE);
    const authProvidersConfig = configService.get<IAuthProvidersConfig>(AUTH_PROVIDERS_NAMESPACE);
    super({
      clientID: authProvidersConfig.itchio.clientID,
      baseUrl: appCfg.baseUrl,
    });
  }

  async validate(req: Request, profile: Profile) {
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
        username: profile.username,
      },
      state: req.query?.state
        ? JSON.parse(Buffer.from(req.query.state as string, 'base64url').toString('utf8'))
        : undefined,
    };
  }
}
