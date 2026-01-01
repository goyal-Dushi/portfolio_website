import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { googleAuthService } from './googleAuth';

export interface EmailPayload {
  email: string;
  username: string;
  subject: string;
  message: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    // Transporter is initialized on demand or we can try init here.
    // However, since we need async access token for *each* send to be safe (or let nodemailer handle it if we pass the right auth object),
    // we can create the transporter when sending, OR use the 'OAuth2' object with the access token function.
    
    // Better Approach: Re-create transporter with fresh token on send, 
    // OR rely on nodemailer effectively. 
    // User requested "merge logic together", implying we explicitly fetch the token using googleapis.
  }

  private async createTransporter() {
      const accessToken = await googleAuthService.getAccessToken();
      
      return nodemailer.createTransport({
          service: 'gmail',
          auth: {
              type: 'OAuth2',
              user: env.EMAIL.USER,
              clientId: env.EMAIL.CLIENT_ID,
              clientSecret: env.EMAIL.CLIENT_SECRET,
              refreshToken: env.EMAIL.REFRESH_TOKEN,
              accessToken: accessToken, // Explicitly verified token
          }
      } as nodemailer.TransportOptions);
  }

  async sendEmail(payload: EmailPayload): Promise<void> {
    const { email, username, subject, message } = payload;
    
    try {
        // Create fresh transporter with valid token
        const transporter = await this.createTransporter();

        const mailOptions = {
            from: env.EMAIL.USER, 
            to: env.EMAIL.USER,
            replyTo: email,
            subject: `[Portfolio Contact] ${subject} from ${username}`,
            html: `
                <h3>New Contact from ${username} (${email})</h3>
                <p>${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
  }
}

export const emailService = new EmailService();
