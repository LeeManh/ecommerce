import { createZodDto } from 'nestjs-zod';
import { VerificationSchema } from '../schema/verification.schema';

const VerifyVerificationCodeSchema = VerificationSchema.pick({
  email: true,
  type: true,
  code: true,
}).strict();

export class VerifyVerificationCodeDto extends createZodDto(
  VerifyVerificationCodeSchema,
) {}
