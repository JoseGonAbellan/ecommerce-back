import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;
  private password = process.env.MAILING_PASSWORD

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'elcalderodelmagoshop@gmail.com',
        pass: this.password,
      },
    });
  }

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'elcalderodelmagoshop@gmail.com',
      to: to,
      subject: subject,
      text: content,
    });
  }
}
