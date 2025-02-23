import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Resend } from 'resend';
import envConfig from 'src/common/configs/env-config';
import { SendEmailDto } from './dtos/send-email.dto';

@Injectable()
export class MailService {
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend(envConfig.RESEND_API_KEY);
  }

  private readonly handleError = (error: any) => {
    switch (error.code) {
      case 'invalid_api_key':
        throw new UnauthorizedException('Invalid API key for email service');
      case 'access_denied':
        throw new ForbiddenException(
          'Email sending is not allowed for this recipient',
        );
      case 'service_unavailable':
        throw new ServiceUnavailableException(
          'Email service is temporarily unavailable',
        );
      default:
        throw new BadRequestException(`Email sending failed: ${error.message}`);
    }
  };

  public async sendEmail(sendEmailDto: SendEmailDto) {
    const { from, to, subject, html } = sendEmailDto;

    const { data, error } = await this.resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) return this.handleError(error);

    return data;
  }
}
