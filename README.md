# account-gateway
Account Gateway for User Login and Obtaining the List of Assets

## Auth providers

Next providers can be used for the authorization:

- `/auth/google`
- `/auth/facebook`
- `/auth/twitter`
- `/auth/steam`
- `/auth/itch-io`

Providers can be activated separately with `AUTH_PROVIDERS` environment variable

### Auth request

Configurations for the providers can be found in `documentation` directory.

#### Request:

Path: `/auth/${provider}`

Query params:

- _(optional)_ `redirectTo` - the URI to be used for the result redirect callback

#### Redirect callback:

Path: `/auth/${provider}/redirect`
