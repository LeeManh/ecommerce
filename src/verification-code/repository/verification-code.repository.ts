import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseAbstractRepository } from 'src/common/repository/base-abstract.repository';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class VerificationRepository extends BaseAbstractRepository<
  typeof Prisma.ModelName.VerificationCode
> {
  constructor(public readonly prisma: PrismaService) {
    super(prisma, 'verificationCode');
  }
}
