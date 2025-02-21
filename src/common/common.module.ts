import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { HashService } from './services/hash.service';

const commonProviders = [PrismaService, HashService];

@Global()
@Module({
  providers: commonProviders,
  exports: commonProviders,
})
export class CommonModule {}
