import { createZodDto } from 'nestjs-zod';
import { UserSchema } from 'src/user/schema/user.schema';

const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
}).strict();

export class LoginDto extends createZodDto(LoginSchema) {}
