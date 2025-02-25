import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';
import { VerificationCodeModule } from 'src/verification-code/verification-code.module';
import { MailModule } from 'src/mail/mail.module';
import { TokenModule } from 'src/token/token.module';
import { DeviceModule } from 'src/device/device.module';

@Module({
  imports: [
    RoleModule,
    UserModule,
    VerificationCodeModule,
    MailModule,
    TokenModule,
    DeviceModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
