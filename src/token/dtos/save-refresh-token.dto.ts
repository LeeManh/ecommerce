import { createZodDto } from 'nestjs-zod';
import { TokenSchema } from '../schema/token.schema';

const SceTokenSchema = TokenSchema.pick({
  userId: true,
  deviceId: true,
  token: true,
}).strict();

export class SaveTokenDto extends createZodDto(SceTokenSchema) {}
