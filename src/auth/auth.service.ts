import { Injectable } from '@nestjs/common';
import { HashService } from 'src/common/services/hash.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { RoleService } from 'src/role/role.service';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly roleService: RoleService,
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {}

  async login() {}

  async logout() {}

  async resetPassword() {}

  async forgotPassword() {}

  async refreshToken() {}
}
