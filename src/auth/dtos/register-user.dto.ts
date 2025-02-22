import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RegisterUserSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
    name: z.string().min(3).max(100),
    phoneNumber: z.string().min(10).max(15),
  })
  .strict();

export class RegisterUserDto extends createZodDto(RegisterUserSchema) {}
