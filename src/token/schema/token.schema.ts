import { z } from 'zod';

export const TokenSchema = z.object({
  id: z.number().int(),
  token: z.string().max(1000),
  userId: z.number().int(),
  deviceId: z.number().int(),
  expiresAt: z.date(),
  createdAt: z.date(),
});
