import { Injectable } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly verificationService: VerificationCodeService,
  ) {}

  public async register(registerUserDto: RegisterUserDto) {
    const clientRoleId = await this.roleService.getClientRoleId();

    const user = await this.userService.create({
      ...registerUserDto,
      roleId: clientRoleId,
    });

    return user;
  }

  public async login() {}

  public async sendOTP(sendOTPRegisterDTO: SendOTPRegisterDTO) {
    await this.userService.validateEmailVerified(sendOTPRegisterDTO.email);

    // Create a new OTP
    const code = generateOTPCode();
    const expiresAt = addMilliseconds(
      new Date(),
      ms(envConfig.OTP_EXPIRES_IN as StringValue),
    );

    const otp = await this.verificationService.createOTP({
      email: sendOTPRegisterDTO.email,
      type: VerificationCodeType.REGISTER,
      code,
      expiresAt,
    });

    // Send the OTP to the email
    console.log('OTP:', otp.code);
  }

  public async verifyOTP(verifyOTPRegisterDto: VerifyOTPRegisterDto) {
    await this.verificationService.verifyOTP({
      ...verifyOTPRegisterDto,
      type: VerificationCodeType.REGISTER,
    });
  }
}
