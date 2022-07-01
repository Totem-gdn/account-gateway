# Google OAuth Configuration

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Choose or create a new project
3. Open **APIs & Services**
4. Open **OAuth consent screen** and complete the step-by-step setup
   1. **Step 1: OAuth consent screen**
      1. Select **External** User type and click **Create**
      2. Fill in the **App name** field with your project name
      3. Choose **User support email** from dropdown
      4. Upload **App logo** _(optional)_
      5. Fill in the **App domain** fields
         1. **Application home page**
            - Example
              - `https://my.domain.com`
         2. **Application privacy policy link**
            - Example
               - `https://my.domain.com/privacy-policy`
         3. **Application terms of service link**
            - Example
               - `https://my.domain.com/terms-of-servicehttp://totem.gdn/`
      6. Add **Authorized domains**
         1. Click **Add domain**
         2. Fill in the filed with your domain
            - Example
              - `my.domain.com`
      7. Fill in the **Developer contact information** email address
      8. Click **Save and continue**
   2. **Step 2: Scopes**
      1. Click **Add or remove scopes**
      2. Select using the checkboxes in the window that opens: 
         - `openid`
         - `/auth/userinfo.email`
         - `/auth/userinfo.profile`
      3. To save the changes, click the **Update** button
      4. Click **Save and continue**
   3. **Step 3: Test users**
      1. Add test users, if you are planing to use this application in `testing mode`
      2. Click **Save and continue**
   4. **Step 4: Summary**
      1. Check the summary and click **Back to dashboard**
5. Open **Credentials**
   1. Click **Create credentials** and select **OAuth client ID** option
   2. Select **Application type** as **Web application**
   3. Fill in the **Name** field
   4. In **Authorized JavaScript origins** click **Add URI** and fill in the field with your domain uri
      - Example
         - `https://my.domain.com`
   5. In **Authorized redirect URIs** click **Add URI** and fill in the field with the redirect uri
      - Notes
         - Default redirect uri is `/auth/google/redirect`
      - Example
         - `https://my.domain.com/auth/google/redirect`
   6. Click **Create** button
   7. Copy **Your Client ID** and **Your Client Secret** to environment variables
      - `GOOGLE_CLIENT_ID`
      - `GOOGLE_CLIENT_SECRET`
6. Open **OAuth consent screen**
   1. Click **Publish App** button
   2. Confirm **Push to production** prompt
   3. Wait until **Publishing status** become **In production**
