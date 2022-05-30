import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ISecretsConfig, SECRETS_NAMESPACE } from '../../../../configuration/secrets/secrets.config';
import { IJwtPayload } from '../interfaces/jwt.payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {
    const secretsCfg = configService.get<ISecretsConfig>(SECRETS_NAMESPACE);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretsCfg.jwtSecret,
      algorithms: ['HS256'], // TODO: add to config
    });
  }

  async validate(payload: IJwtPayload): Promise<IJwtPayload> {
    return payload;
  }
}
