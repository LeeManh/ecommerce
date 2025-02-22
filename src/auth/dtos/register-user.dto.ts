import { createZodDto } from 'nestjs-zod';
import { UserSchema } from 'src/user/schema/user.schema';

const RegisterUserSchema = UserSchema.pick({
  email: true,
  password: true,
  name: true,
  phoneNumber: true,
}).strict();

export class RegisterUserDto extends createZodDto(RegisterUserSchema) {}
