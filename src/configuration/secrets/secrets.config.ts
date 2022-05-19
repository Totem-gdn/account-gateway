import { registerAs } from '@nestjs/config';

export const SECRETS_NAMESPACE = 'secrets';

export interface ISecretsConfig {
  sessionSecret: string;
  jwtSecret: string;
}

export default registerAs(
  SECRETS_NAMESPACE,
  (): ISecretsConfig => ({
    sessionSecret: process.env.SESSION_SECRET,
    jwtSecret: process.env.JWT_SECRET,
  }),
);
