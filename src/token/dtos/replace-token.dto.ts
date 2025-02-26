import { createZodDto } from 'nestjs-zod';
import { TokenSchema } from '../schema/token.schema';

const ReplaceTokenSchema = TokenSchema.pick({
  userId: true,
  deviceId: true,
}).strict();

export class ReplaceTokenDto extends createZodDto(ReplaceTokenSchema) {}
