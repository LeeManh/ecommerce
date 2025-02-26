import { createZodDto } from 'nestjs-zod';
import { TokenSchema } from 'src/token/schema/token.schema';

const RefreshTokenSchema = TokenSchema.pick({
  token: true,
}).strict();

export class RefreshTokenDto extends createZodDto(RefreshTokenSchema) {}
