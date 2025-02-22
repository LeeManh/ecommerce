import { UserStatus } from '@prisma/client';
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.string().email(),
  name: z.string().min(3).max(500),
  password: z.string().min(6).max(500),
  phoneNumber: z.string().min(10).max(50),
  avatar: z.string().max(1000).nullable().optional(),
  totpSecret: z.string().max(1000).nullable().optional(),
  status: z.nativeEnum(UserStatus),
  roleId: z.number().int(),
  createdById: z.number().int().nullable().optional(),
  updatedById: z.number().int().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
