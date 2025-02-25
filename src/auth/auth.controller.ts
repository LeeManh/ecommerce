import { Body, Controller, Ip, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { ZodSerializerDto } from 'nestjs-zod';
import { UserDto } from 'src/user/dtos/user.dto';
import { SendOTPRegisterDTO } from './dtos/send-otp-register.dto';
import { VerifyOTPRegisterDto } from './dtos/verify-otp-register.dto';
import { UserAgent } from 'src/common/decorators/user-agent.decorator';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ZodSerializerDto(UserDto)
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('send-otp')
  async sendOTP(@Body() sendOTPRegisterDTO: SendOTPRegisterDTO) {
    return this.authService.sendOTP(sendOTPRegisterDTO);
  }

  @Post('verify-otp')
  async verifyOTP(@Body() verifyOTPRegisterDto: VerifyOTPRegisterDto) {
    return this.authService.verifyOTP(verifyOTPRegisterDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @UserAgent() userAgent: string,
    @Ip() ip: string,
  ) {
    return this.authService.login(loginDto, userAgent, ip);
  }
}
