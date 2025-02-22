import { VerificationSchema } from './../../verification-code/schema/verification.schema';
import { createZodDto } from 'nestjs-zod';

const SendOTPSchema = VerificationSchema.pick({
  email: true,
  type: true,
}).strict();

export class SendOTPDto extends createZodDto(SendOTPSchema) {}
