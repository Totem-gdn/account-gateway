import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, Profile, IStrategyOption } from 'passport-twitter';
import { APP_NAMESPACE, IAppConfig } from '../../configuration/app/app.config';
import { TWITTER_NAMESPACE, ITwitterConfig } from '../../configuration/twitter/twitter.config';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private readonly configService: ConfigService) {
    const appCfg = configService.get<IAppConfig>(APP_NAMESPACE);
    const twitterCfg = configService.get<ITwitterConfig>(TWITTER_NAMESPACE);

    super({
      consumerKey: twitterCfg.consumerKey,
      consumerSecret: twitterCfg.consumerSecret,
      callbackURL: `${appCfg.baseUrl}/auth/twitter/redirect`,
      includeEmail: true,
    } as IStrategyOption);
  }

  async validate(token, tokenSecret, profile: Profile, done): Promise<any> {
    const user = {
      provider: 'twitter',
      id: profile.id,
      username: profile.emails?.[0]?.value || profile.username,
    };
    done(null, user);
  }
}
