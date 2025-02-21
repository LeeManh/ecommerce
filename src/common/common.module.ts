import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';

const commonProviders = [PrismaService];

@Global()
@Module({
  providers: commonProviders,
  exports: commonProviders,
})
export class CommonModule {}
