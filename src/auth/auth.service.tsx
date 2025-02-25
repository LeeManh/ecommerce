import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RoleService } from 'src/role/role.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { VerificationCodeService } from 'src/verification-code/verification-code.service';
import { addMilliseconds } from 'date-fns';
import ms, { StringValue } from 'ms';
import envConfig from 'src/common/configs/env-config';
import { UserService } from 'src/user/user.service';
import { generateOTPCode } from 'src/common/libs/otp.lib';
import { SendOTPRegisterDTO } from './dtos/send-otp-register.dto';
import { VerificationCodeType } from '@prisma/client';
import { VerifyOTPRegisterDto } from './dtos/verify-otp-register.dto';
import { MailService } from 'src/mail/mail.service';
import VerifyRegisterOTPEmail from 'src/mail/templates/send-register-otp.template';
import * as React from 'react';
import { LoginDto } from './dtos/login.dto';
import { HashService } from 'src/common/services/hash.service';
import { TokenService } from 'src/token/token.service';
import { TokenPayload } from 'src/token/types/token.type';
import { DeviceService } from 'src/device/device.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly verificationService: VerificationCodeService,
    private readonly mailService: MailService,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly deviceService: DeviceService,
  ) {}

  public async register(registerUserDto: RegisterUserDto) {
    const clientRoleId = await this.roleService.getClientRoleId();

    const user = await this.userService.create({
      ...registerUserDto,
      roleId: clientRoleId,
    });

    return user;
  }

  public async login(loginDto: LoginDto, userAgent: string, ip: string) {
    const { email, password } = loginDto;

    /* ----------------------- validate email and password ---------------------- */
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isPasswordMatch = await this.hashService.compare(
      password,
      user.password as string,
    );
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid email or password');

    /* ------------------------ Create device user login ------------------------ */
    const device = await this.deviceService.createDevice({
      userAgent,
      ip,
      userId: user.id as number,
    });

    /* ------------------ create access token and refresh token ----------------- */
    const payloadToken: TokenPayload = {
      userId: user.id as number,
      roleId: user.roleId as number,
      deviceId: device.id as number,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken(payloadToken),
      this.tokenService.generateRefreshToken(payloadToken),
    ]);

    /* --------------------- save refresh token to database --------------------- */
    const decodedRefreshToken =
      await this.tokenService.verifyRefreshToken(refreshToken);
    await this.tokenService.createToken({
      userId: user.id as number,
      deviceId: device.id as number,
      token: refreshToken,
      expiresAt: new Date(decodedRefreshToken.exp * 1000), // convert to milliseconds
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async sendOTP(sendOTPRegisterDTO: SendOTPRegisterDTO) {
    await this.userService.validateEmailVerified(sendOTPRegisterDTO.email);

    /* ---------------------------- Create a new OTP ---------------------------- */
    const code = generateOTPCode();
    const expiresAt = addMilliseconds(
      new Date().toISOString(),
      ms(envConfig.OTP_EXPIRES_IN as StringValue),
    );
    await this.verificationService.createOTP({
      email: sendOTPRegisterDTO.email,
      type: VerificationCodeType.REGISTER,
      code,
      expiresAt,
    });

    /* ------------------------ Send the OTP to the email ----------------------- */
    await this.mailService.sendEmail({
      from: 'Ecommerce <noreply@leem.io.vn>',
      to: [sendOTPRegisterDTO.email],
      subject: 'OTP Verification Code',
      react: <VerifyRegisterOTPEmail validationCode={code} />,
    });

    return {
      message: 'OTP has been sent to your email',
    };
  }

  public async verifyOTP(verifyOTPRegisterDto: VerifyOTPRegisterDto) {
    await this.verificationService.verifyOTP({
      ...verifyOTPRegisterDto,
      type: VerificationCodeType.REGISTER,
    });
  }
}
