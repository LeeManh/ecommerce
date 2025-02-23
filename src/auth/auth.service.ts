import { Injectable } from '@nestjs/common';
import { RoleService } from 'src/role/role.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { SendOTPDto } from './dtos/send-op.dto';
import { VerificationCodeService } from 'src/verification-code/verification-code.service';
import { addMilliseconds } from 'date-fns';
import ms, { StringValue } from 'ms';
import envConfig from 'src/common/configs/env-config';
import { UserService } from 'src/user/user.service';
import { generateOTPCode } from 'src/common/libs/otp.lib';
import { VerifyVerificationCodeDto } from 'src/verification-code/dtos/verify-verification-code.dto';

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

  public async sendOTP(sendOTPDto: SendOTPDto) {
    await this.userService.validateEmailVerified(sendOTPDto.email);

    // Create a new OTP
    const code = generateOTPCode();
    const expiresAt = addMilliseconds(
      new Date(),
      ms(envConfig.OTP_EXPIRES_IN as StringValue),
    );

    return await this.verificationService.createOTP({
      email: sendOTPDto.email,
      type: sendOTPDto.type,
      code,
      expiresAt,
    });
  }

  public async verifyOTP(verifyVerificationCodeDto: VerifyVerificationCodeDto) {
    await this.verificationService.verifyOTP(verifyVerificationCodeDto);
  }
}
