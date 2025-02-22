import { VerificationCodeType } from '@prisma/client';
import { z } from 'zod';

export const VerificationSchema = z.object({
  id: z.number().int(),
  email: z.string().email(),
  code: z.string().max(50),
  type: z.nativeEnum(VerificationCodeType),
  expiresAt: z.date(),
  createdAt: z.date(),
});
