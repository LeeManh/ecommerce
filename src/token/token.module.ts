import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import envConfig from 'src/common/configs/env-config';
import { TokenRepository } from './repository/token.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: envConfig.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN },
    }),
  ],
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
