import { createZodDto } from 'nestjs-zod';
import { DeviceSchema } from '../schema/device.schema';

const CreateDeviceSchema = DeviceSchema.pick({
  userId: true,
  userAgent: true,
  ip: true,
})
  .extend({
    lastActive: DeviceSchema.shape.lastActive.optional(),
    isActive: DeviceSchema.shape.isActive.optional(),
  })
  .strict();

export class CreateDeviceDto extends createZodDto(CreateDeviceSchema) {}
