import { createZodDto } from 'nestjs-zod';
import { VerificationSchema } from 'src/verification-code/schema/verification.schema';

const SendOTPRegisterSchema = VerificationSchema.pick({
  email: true,
}).strict();

export class SendOTPRegisterDTO extends createZodDto(SendOTPRegisterSchema) {}
