import { createZodDto } from 'nestjs-zod';
import { VerificationSchema } from '../schema/verification.schema';

const CreateVerificationCodeSchema = VerificationSchema.pick({
  email: true,
  type: true,
  code: true,
  expiresAt: true,
}).strict();

export class CreateVerificationCodeDto extends createZodDto(
  CreateVerificationCodeSchema,
) {}
