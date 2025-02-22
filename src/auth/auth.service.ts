import { Injectable } from '@nestjs/common';
import { HashService } from 'src/common/services/hash.service';
import { RoleService } from 'src/role/role.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UserRepository } from 'src/user/repository/user.repository';
import { SendOTPDto } from './dtos/send-op.dto';
import { VerificationCodeService } from 'src/verification-code/verification-code.service';
import { addMilliseconds } from 'date-fns';
import ms, { StringValue } from 'ms';
import envConfig from 'src/common/configs/env-config';

@Injectable()
export class AuthService {
  constructor(
    private readonly roleService: RoleService,
    private readonly hashService: HashService,
    private readonly userRepository: UserRepository,
    private readonly verificationService: VerificationCodeService,
  ) {}

  public async register(registerUserDto: RegisterUserDto) {
    await this.userRepository.validateUniqueEmail(registerUserDto.email);

    const clientRoleId = await this.roleService.getClientRoleId();

    const hashedPassword = await this.hashService.hash(
      registerUserDto.password,
    );

    const user = await this.userRepository.create({
      data: {
        ...registerUserDto,
        password: hashedPassword,
        roleId: clientRoleId,
      },
    });

    return user;
  }

  // Người dùng nhập email và nhấn Gửi OTP.
  // Nhận OTP qua email, sau đó nhập mã OTP để xác thực email.
  // Sau khi xác thực thành công, tiếp tục quá trình đăng ký (nhập mật khẩu, tên, v.v.).
  public async sendOTP(sendOTPDto: SendOTPDto) {
    await this.userRepository.validateUniqueEmail(sendOTPDto.email);

    // Create a new OTP
    const code = this.verificationService.generateOTPCode();
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
}
