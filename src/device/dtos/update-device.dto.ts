import { createZodDto } from 'nestjs-zod';
import { DeviceSchema } from '../schema/device.schema';

const UpdateDeviceSchema = DeviceSchema.pick({
  userAgent: true,
  ip: true,
})
  .partial()
  .strict();

export class UpdateDeviceDto extends createZodDto(UpdateDeviceSchema) {}
