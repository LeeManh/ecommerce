import { createZodDto } from 'nestjs-zod';
import { TokenSchema } from '../schema/token.schema';

const CreateTokenSchema = TokenSchema.pick({
  token: true,
  userId: true,
  deviceId: true,
  expiresAt: true,
}).strict();

export class CreateTokenDto extends createZodDto(CreateTokenSchema) {}
