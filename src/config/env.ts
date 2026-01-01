import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const env = {
  PORT: process.env.PORT || 8080,
  EMAIL: {
    USER: process.env.EMAIL,
    HOST: process.env.MAIL_HOST || 'smtp.gmail.com',
    PORT: parseInt(process.env.MAIL_PORT || '587'),
    CLIENT_ID: process.env.GMAIL_CLIENT_ID,
    CLIENT_SECRET: process.env.GMAIL_CLIENT_SECRET,
    REFRESH_TOKEN: process.env.GMAIL_REFRESH_TOKEN,
    REDIRECT_URI: process.env.GMAIL_REDIRECT_URI,
  }
};
