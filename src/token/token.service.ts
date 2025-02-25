import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { TokenPayload } from './types/token.type';
import envConfig from 'src/common/configs/env-config';
import { TokenRepository } from './repository/token.repository';
import { CreateTokenDto } from './dtos/create-token.dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  public async generateToken(payload: TokenPayload, options?: JwtSignOptions) {
    return await this.jwtService.signAsync(payload, options);
  }

  public async generateAccessToken(payload: TokenPayload) {
    return this.generateToken(payload);
  }

  public async generateRefreshToken(payload: TokenPayload) {
    return this.generateToken(payload, {
      expiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN,
      secret: envConfig.REFRESH_TOKEN_SECRET,
    });
  }

  public async verifyToken(token: string, options?: JwtVerifyOptions) {
    return this.jwtService.verifyAsync(token, options);
  }

  public async verifyAccessToken(token: string) {
    return this.verifyToken(token);
  }

  public async verifyRefreshToken(token: string) {
    return this.verifyToken(token, {
      secret: envConfig.REFRESH_TOKEN_SECRET,
    });
  }

  public async createToken(createTokenDto: CreateTokenDto) {
    return await this.tokenRepository.create({
      data: createTokenDto,
    });
  }
}
