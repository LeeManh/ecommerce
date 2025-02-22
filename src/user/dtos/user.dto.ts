import { createZodDto } from 'nestjs-zod';
import { UserSchema } from '../schema/user.schema';

const UserSchemaResponse = UserSchema.omit({
  password: true,
  totpSecret: true,
  createdById: true,
  updatedById: true,
  deletedAt: true,
});

export class UserDto extends createZodDto(UserSchemaResponse) {}
