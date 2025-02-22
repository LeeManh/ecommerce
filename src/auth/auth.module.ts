import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [RoleModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
