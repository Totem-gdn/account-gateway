import { DynamicModule, Module } from '@nestjs/common';
import { isProviderEnabled } from '../configuration/providers/providers.config';
import { FacebookModule } from './providers/facebook/facebook.module';
import { GoogleModule } from './providers/google/google.module';
import { TwitterModule } from './providers/twitter/twitter.module';

@Module({})
export class AuthModule {
  static register(): DynamicModule {
    // TODO: implement it with RouterModule
    const providers = [];
    if (isProviderEnabled('google')) {
      providers.push(GoogleModule);
    }
    if (isProviderEnabled('facebook')) {
      providers.push(FacebookModule);
    }
    if (isProviderEnabled('twitter')) {
      providers.push(TwitterModule);
    }
    return {
      module: AuthModule,
      imports: providers,
      exports: providers,
    };
  }
}
