import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const SendEmailSchema = z.object({
  from: z.string(),
  to: z.array(z.string()),
  subject: z.string(),
  html: z.string(),
});

export class SendEmailDto extends createZodDto(SendEmailSchema) {}
