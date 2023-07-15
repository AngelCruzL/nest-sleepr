import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

import { NotifyEmailDto } from './dto';

@Injectable()
export class NotificationsService {
  readonly #transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get<string>('SMTP_USER'),
      clientId: this.configService.get<string>('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get<string>(
        'GOOGLE_OAUTH_CLIENT_SECRET',
      ),
      refreshToken: this.configService.get<string>(
        'GOOGLE_OAUTH_REFRESH_TOKEN',
      ),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async notifyEmail({ email, text }: NotifyEmailDto) {
    await this.#transporter.sendMail({
      from: this.configService.get<string>('SMTP_USER'),
      to: email,
      subject: 'Sleepr Notification',
      text,
    });
  }
}
