import { Module } from '@nestjs/common';
import { VerificationRepository } from './repository/verification-code.repository';
import { VerificationCodeService } from './verification-code.service';

@Module({
  providers: [VerificationRepository, VerificationCodeService],
  exports: [VerificationCodeService],
})
export class VerificationCodeModule {}
