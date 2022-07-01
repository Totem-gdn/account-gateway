# itch.io OAuth Configuration

1. Open [Itch.io OAuth Applications](https://itch.io/user/settings/oauth-apps)
2. Click **Register new application**
   1. Fill in the **Application name** field
   2. Fill in the **Homepage URL**
      - Example
        - `https://my.domain.com`
   3. Fill in the **Application description** _(optional)_
   4. Fill in the **Authorization callback URL**
      - Notes
        - [itch.io](https://itch.io) uses "Implicit flow" of the OAuth 2.0 spec
        - Unlike other providers `itch.io` includes `access_token` to `hash` part of the Callback URL. The served page at this Callback URL handles the `access_token` and securely passes it to the server
        - 
      - Example
        - `https://my.domain.com/auth/itch-io/redirect`
   5. Click **Register application**
3. Copy **Client ID** to environment variables
    - `ITCHIO_CLIENT_ID`
