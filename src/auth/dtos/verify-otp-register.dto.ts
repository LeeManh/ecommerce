import { createZodDto } from 'nestjs-zod';
import { VerificationSchema } from 'src/verification-code/schema/verification.schema';

const VerifyOTPRegisterSchema = VerificationSchema.pick({
  email: true,
  code: true,
}).strict();

export class VerifyOTPRegisterDto extends createZodDto(
  VerifyOTPRegisterSchema,
) {}
