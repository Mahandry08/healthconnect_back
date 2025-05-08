import nodemailer, { Transporter } from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

class EmailService {
  private transporter: Transporter;

  constructor() {
    
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: options.to, 
        subject: options.subject, 
        text: options.text, 
        html: options.html, 
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email envoyé : %s', info.messageId);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
      throw new Error('Échec de l\'envoi de l\'email');
    }
  }
}

export default new EmailService();