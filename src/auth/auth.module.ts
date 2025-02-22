import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [RoleModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
