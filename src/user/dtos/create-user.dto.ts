import { createZodDto } from 'nestjs-zod';
import { UserSchema } from 'src/user/schema/user.schema';

const CreateUserSchema = UserSchema.pick({
  email: true,
  password: true,
  name: true,
  phoneNumber: true,
  roleId: true,
}).strict();

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
