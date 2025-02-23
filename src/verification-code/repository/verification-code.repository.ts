import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseAbstractRepository } from 'src/common/repository/base-abstract.repository';
import { PrismaService } from 'src/common/services/prisma.service';
import { IConditionFindValidVerificationCode } from '../types';

@Injectable()
export class VerificationRepository extends BaseAbstractRepository<
  typeof Prisma.ModelName.VerificationCode
> {
  constructor(public readonly prisma: PrismaService) {
    super(prisma, 'verificationCode');
  }

  async findValidVerificationCode({
    email,
    code,
    type,
  }: IConditionFindValidVerificationCode) {
    // Find the verification code
    const verification = await this.findFirst({
      where: {
        email,
        code,
        type,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    return verification;
  }
}
