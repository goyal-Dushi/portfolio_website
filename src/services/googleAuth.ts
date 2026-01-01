import { google } from 'googleapis';
import { env } from '../config/env';

export class GoogleAuthService {
  private oAuth2Client;

  constructor() {
    this.oAuth2Client = new google.auth.OAuth2(
      env.EMAIL.CLIENT_ID,
      env.EMAIL.CLIENT_SECRET,
      env.EMAIL.REDIRECT_URI
    );

    // Debugging Env loading
    if (process.env.NODE_ENV !== 'production') {
        console.log('Google Auth Config Check:', {
            hasUser: !!env.EMAIL.USER,
            hasClientId: !!env.EMAIL.CLIENT_ID,
            hasClientSecret: !!env.EMAIL.CLIENT_SECRET,
            hasRefreshToken: !!env.EMAIL.REFRESH_TOKEN,
            redirectUri: env.EMAIL.REDIRECT_URI
        });
    }

    // Set the credentials immediately since we have the refresh token
    if (env.EMAIL.REFRESH_TOKEN) {
        this.oAuth2Client.setCredentials({
            refresh_token: env.EMAIL.REFRESH_TOKEN
        });
    } else {
        console.warn('GMAIL_REFRESH_TOKEN not found in environment!');
    }
  }

  async getAccessToken(): Promise<string> {
    try {
      const accessTokenDetails = await this.oAuth2Client.getAccessToken();
      const token = accessTokenDetails.token;
      
      if (!token) {
        throw new Error('Failed to retrieve access token.');
      }
      
      return token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }
}

export const googleAuthService = new GoogleAuthService();
