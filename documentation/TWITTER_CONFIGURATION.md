# Twitter OAuth Configuration

1. Open [Twitter Developer Portal](https://developer.twitter.com) and open **Dashboard**
2. Select **Projects & Apps** and click **+ New Project** button
   1. Fill in the **Project name**
   2. Select **Use case** as `Build customized solutions in-house` or `Doing something else`
   3. Fill in the **Description (optional)** with some description
      - Example
        - **use Twitter OAuth 1.0a for user authentication**
   4. On **App Environment** page select `Production`
   5. Fill in the **App name** field
   6. Copy **API Key** and **API Key Secret** to environment variables
       - `TWITTER_CONSUMER_KEY`
       - `TWITTER_CONSUMER_SECRET`
   7. Click **App settings** button
3. On **Settings** tab of your App
   1. In **User authentication settings** click **Set up** button
   2. Activate **OAuth 1.0a** option
   3. Activate **Request email from users (optional)** option
   4. Configure **Callback URI/ Redirect URL**
      - Notes
        - Default redirect path is `/auth/twitter/redirect`
      - Example
        - `https://my.domain.com/auth/twitter/redirect`
   5. Fill in the **Website URL**
   6. Fill in the **Organization name (optional)**
   7. Fill in the **Organization URL (optional)**
       - Example
           - `https://my.domain.com`
   8. Fill in the **Terms of service**
      - Example
        - `https://my.domain.com/terms-of-service`
   9. Fill in the **Privacy policy**
       - Example
           - `https://my.domain.com/privacy-policy`
   10. Click **Save** button
4. Go to the **Project overview page** and check, that `Access type` is `Elevated`
   - Notes
     - If your access type is `Essential` - then you need to improve your application **Access level** 
