import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateEmailOptions, CreateEmailRequestOptions, Resend } from 'resend';
import envConfig from 'src/common/configs/env-config';

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

  public async sendEmail(
    payload: CreateEmailOptions,
    options?: CreateEmailRequestOptions,
  ) {
    const { data, error } = await this.resend.emails.send(payload, options);

    if (error) return this.handleError(error);

    return data;
  }
}
