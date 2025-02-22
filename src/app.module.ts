import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import CustomZodValidationPipe from './common/pipes/zod-validation.pipe';
import { ZodSerializerInterceptor } from 'nestjs-zod';

@Module({
  imports: [CommonModule, AuthModule, UserModule, RoleModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useClass: CustomZodValidationPipe },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  ],
})
export class AppModule {}
