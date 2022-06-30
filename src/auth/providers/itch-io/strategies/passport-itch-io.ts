import * as path from 'path';
import { Request } from 'express';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Profile } from 'passport';
import { Strategy } from 'passport-strategy';

type ItchioUser = {
  id: number;
  username: string;
  display_name: string;
  cover_url: string;
  url: string;
  gamer: boolean;
  press_user: boolean;
  developer: boolean;
};

type ItchioProfile = Profile & { _raw: ItchioUser };

export class PassportItchioStrategy extends Strategy {
  private readonly name?: string | undefined;
  private readonly scope = 'profile:me'; // only this scope is available
  private readonly profileURL: URL;
  private readonly authorizationURL: URL;
  private readonly callbackURL: URL;
  private readonly clientID: string;
  private readonly _verify: (...params: any) => any;

  constructor({ clientID, baseUrl }, verify) {
    if (!verify) {
      throw new Error('ItchIoStrategy requires verify callback');
    }
    if (!clientID) {
      throw new Error('ItchIoStrategy requires clientID');
    }
    if (!baseUrl) {
      throw new Error('ItchIoStrategy requires base url');
    }
    super();
    this.name = 'itch-io';
    this._verify = verify;

    this.clientID = clientID;
    this.callbackURL = new URL(baseUrl);
    this.callbackURL.pathname = path.join(this.callbackURL.pathname, 'auth/itch-io/callback');
    this.authorizationURL = new URL('https://itch.io/user/oauth');
    this.authorizationURL.searchParams.append('client_id', this.clientID);
    this.authorizationURL.searchParams.append('scope', this.scope);
    this.authorizationURL.searchParams.append('response_type', 'token');
    this.authorizationURL.searchParams.append('redirect_uri', this.callbackURL.toString());
    this.profileURL = new URL('https://itch.io/api/1/$KEY/me');
  }

  authenticate(req: Request, options: any = {}): void {
    // itch.io implements the “Implicit flow” of the OAuth 2.0 spec
    if (req.query?.error) {
      if (req.query.error === 'invalid_token') {
        return this.fail(req.query.error_description, 401);
      } else {
        return this.error(new Error('Unknown error'));
      }
    }
    if (req.query?.access_token) {
      const state = req.query.state;
      const profileURL = new URL(this.profileURL);
      profileURL.pathname = profileURL.pathname.replace('$KEY', req.query.access_token as string);
      axios
        .get(profileURL.toString())
        .then((res: AxiosResponse<{ user: ItchioUser }>) => {
          const { user } = res.data;
          const profile: ItchioProfile = {
            provider: this.name,
            id: `${user.id}`,
            displayName: user.display_name,
            username: user.username,
            photos: [{ value: user.cover_url }],
            _raw: user,
          };
          this._verify(req, profile, (err, user, info) => {
            if (err) {
              return this.error(err);
            }
            if (!user) {
              return this.fail(info);
            }
            info = info || {};
            if (state) {
              info.state = state;
            }
            this.success(user, info);
          });
        })
        .catch((e) => {
          if (e instanceof AxiosError) {
            return this.fail(e.message, e.response.status);
          }
          return this.error(e);
        });
    } else {
      const authUrl = new URL(this.authorizationURL);
      if (options.state && typeof options.state === 'string') {
        authUrl.searchParams.append('state', options.state);
      }
      return this.redirect(authUrl.toString());
    }
  }
}
