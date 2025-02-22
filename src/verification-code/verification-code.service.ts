import { CreateVerificationCodeDto } from './dtos/create-verification-code.dto';
import { Injectable } from '@nestjs/common';
import { VerificationRepository } from './repository/verification-code.repository';
import { TooManyRequestsException } from 'src/common/exceptions/too-many-requests.exception';

@Injectable()
export class VerificationCodeService {
  constructor(
    private readonly verificationRepository: VerificationRepository,
  ) {}

  // 6-digit OTP code
  generateOTPCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  async createOTP(createVerificationDto: CreateVerificationCodeDto) {
    // check if the user has already requested an OTP and if it has not expired
    const existingVerification = await this.verificationRepository.findFirst({
      where: {
        email: createVerificationDto.email,
        type: createVerificationDto.type,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    // if it has not expired, throw an error saying that the user has already requested an OTP and should wait for it to expire
    if (existingVerification)
      throw new TooManyRequestsException(
        'You have already requested an OTP. Please try again later.',
      );

    // if it has expired, create a new OTP
    const verification = await this.verificationRepository.create({
      data: createVerificationDto,
    });

    return verification;
  }
}
