import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { TokenPayload } from './types/token.type';
import envConfig from 'src/common/configs/env-config';
import { TokenRepository } from './repository/token.repository';
import { CreateTokenDto } from './dtos/create-token.dto';
import { ReplaceTokenDto } from './dtos/replace-token.dto';
import { SaveTokenDto } from './dtos/save-refresh-token.dto';

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

  public async verifyRefreshToken(token: string): Promise<TokenPayload> {
    return this.verifyToken(token, {
      secret: envConfig.REFRESH_TOKEN_SECRET,
    });
  }

  public async createToken(createTokenDto: CreateTokenDto) {
    return await this.tokenRepository.create({
      data: createTokenDto,
    });
  }

  public async findOneTokenByToken(token: string) {
    return await this.tokenRepository.findFirst({ where: { token } });
  }

  public async replaceRefreshToken(
    oldToken: string,
    newToken: string,
    replaceTokenDto: ReplaceTokenDto,
  ) {
    const newDecodedRefreshToken = await this.verifyRefreshToken(newToken);
    await this.createToken({
      ...replaceTokenDto,
      token: newToken,
      expiresAt: new Date((newDecodedRefreshToken.exp as number) * 1000), // convert to milliseconds
    });
    await this.tokenRepository.delete({ where: { token: oldToken } });
  }

  public async saveRefreshToken({ token, userId, deviceId }: SaveTokenDto) {
    const decodedRefreshToken = await this.verifyRefreshToken(token);
    await this.createToken({
      token,
      userId,
      deviceId,
      expiresAt: new Date((decodedRefreshToken.exp as number) * 1000), // convert to milliseconds
    });
  }
}
