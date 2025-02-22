import { ConflictException, Injectable } from '@nestjs/common';
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

  public async validateUniqueEmail(email: string) {
    const existingUser = await this.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    return existingUser;
  }
}
