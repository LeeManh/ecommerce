import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseAbstractRepository } from 'src/common/repository/base-abstract.repository';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class UserRepository extends BaseAbstractRepository<
  typeof Prisma.ModelName.User
> {
  constructor(public readonly prisma: PrismaService) {
    super(prisma, 'user');
  }
}
