import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceRepository } from './repository/device.repository';

@Module({
  providers: [DeviceService, DeviceRepository],
  exports: [DeviceService],
})
export class DeviceModule {}
