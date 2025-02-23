import { CreateVerificationCodeDto } from './dtos/create-verification-code.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { VerificationRepository } from './repository/verification-code.repository';
import { TooManyRequestsException } from 'src/common/exceptions/too-many-requests.exception';
import { VerifyVerificationCodeDto } from './dtos/verify-verification-code.dto';

@Injectable()
export class VerificationCodeService {
  constructor(
    private readonly verificationRepository: VerificationRepository,
  ) {}

  async verifyOTP(verifyVerificationCodeDto: VerifyVerificationCodeDto) {
    const { email, code, type } = verifyVerificationCodeDto;

    // Find the verification code
    const verification =
      await this.verificationRepository.findValidVerificationCode({
        email,
        code,
        type,
      });

    // if the verification code does not exist or has expired, throw an error
    if (!verification) throw new BadRequestException('Invalid or expired OTP.');

    // delete the verification code
    await this.verificationRepository.delete({
      where: {
        id: verification.id,
      },
    });

    return verification;
  }

  async createOTP(createVerificationDto: CreateVerificationCodeDto) {
    const { email, code, type } = createVerificationDto;

    // check if the user has already requested an OTP and if it has not expired
    const existingVerification =
      await this.verificationRepository.findValidVerificationCode({
        email,
        code,
        type,
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
