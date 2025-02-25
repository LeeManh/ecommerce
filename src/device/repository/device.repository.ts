import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseAbstractRepository } from 'src/common/repository/base-abstract.repository';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class DeviceRepository extends BaseAbstractRepository<
  typeof Prisma.ModelName.Device
> {
  constructor(public readonly prisma: PrismaService) {
    super(prisma, 'device');
  }
}
