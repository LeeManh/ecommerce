import { Injectable } from '@nestjs/common';
import { DeviceRepository } from './repository/device.repository';
import { CreateDeviceDto } from './dtos/create-device.dto';

@Injectable()
export class DeviceService {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  public async createDevice(createDeviceDto: CreateDeviceDto) {
    return await this.deviceRepository.create({
      data: createDeviceDto,
    });
  }
}
