import { UserStatus } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
  avatar: z.string().nullable(),
  status: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.BLOCKED]),
  roleId: z.number(),
  // createdById: z.number().nullable(),
  // updatedById: z.number().nullable(),
  // deletedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export class UserDto extends createZodDto(UserSchema) {}
