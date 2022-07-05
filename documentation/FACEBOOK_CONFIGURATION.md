# Facebook OAuth Configuration

1. Open [Facebook Developers](https://developers.facebook.com/apps)
2. Click **Create App**
3. Select **Gaming** option and click **Next**
4. Fill in the **Display name** field
5. Click **Create App** and confirm app creation
6. Find **Facebook Login for Gaming** in **Add products to your app** category and click **Set up** button
   1. Configure **Facebook Login for Gaming Settings**
      - Notes
        - All settings not mentioned below should be set to `No`
        - Default redirect path is `/auth/facebook/redirect`
      - Settings
         - `Client OAuth login: Yes`
         - `Enable Login for Web: Yes`
         - `Enable Login for Embedded Browser: Yes`
         - `Login with the JavaScript SDK: Yes`
         - `Allowed Domains for the JavaScript SDK: my.domain.com`
         - `Valid OAuth Redirect URIs: https://my.domain.com/auth/facebook/redirect`
   2. Click **Save changes**
7. Open **Settings** and select **Basic**
   1. Fill in the **App domains**
      - Example
        - `my.domain.com`
   2. Fill in the **Privacy Policy URL**
       - Example
           - `https://my.docmain.com/privacy-policy`
   3. Fill in the **Terms of Service URL**
       - Example
           - `https://my.docmain.com/terms-of-service`
   4. Fill in the **User data deletion**
      - Notes
        - Use **Data deletion instructions URL** type
        - _It can be as part of **Terms and Conditions**_
      - Example
        - `https://my.docmain.com/data-deletion-instruction`
   5. Upload **App icon** _(optional)_
   6. Scroll down and click **+ Add platform** button
      1. Select **Website** option and click **Next**
      2. Fill in the **Site URL** field
         - Example
           - `https://my.domain.com`
   7. Click **Save changes**
   8. Click **Show** button next to **App secret** field
   9. Copy **App ID** and **App Secret** to environment variables
      - `FACEBOOK_APP_ID`
      - `FACEBOOK_APP_SECRET`
8. Switch to live mode by click on `In development` toggle and then click **Switch mode**
   - Complete the transition to production mode according to the instructions from Facebook
