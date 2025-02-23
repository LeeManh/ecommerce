import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';
import { VerificationCodeModule } from 'src/verification-code/verification-code.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [RoleModule, UserModule, VerificationCodeModule, MailModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
