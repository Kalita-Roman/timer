# Google Cloud Platform OAuth2 Configuration

## Required GCP Console Settings

When setting up OAuth2 credentials in the Google Cloud Console, use the following configuration:

### Authorized JavaScript Origins
```
http://localhost:3030
```

For production, add your production domain:
```
https://your-production-domain.com
```

### Authorized Redirect URIs
```
http://localhost:3030/auth/google/callback
```

For production, add your production callback URL:
```
https://your-production-domain.com/auth/google/callback
```

## Setup Steps

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable the Google+ API (or Google People API)
4. Go to "Credentials" in the left sidebar
5. Click "Create Credentials" > "OAuth 2.0 Client IDs"
6. Choose "Web application" as the application type
7. Add the authorized JavaScript origins and redirect URIs listed above
8. Copy the Client ID and Client Secret to your .env file

## Environment Variables

Set these environment variables in your `.env` file:

```bash
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
SESSION_SECRET=your_random_session_secret_here
PORT=3030
```

## Security Notes

- Never commit your `.env` file to version control
- Use strong, random values for SESSION_SECRET in production
- Enable HTTPS in production and set `cookie.secure: true` in session configuration
- Consider using environment-specific configuration for different deployment environments