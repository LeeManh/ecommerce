import { ConflictException, Injectable } from '@nestjs/common';
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

  async register(registerUserDto: RegisterUserDto) {
    try {
      const clientRoleId = await this.roleService.getClientRoleId();

      const hashedPassword = await this.hashService.hash(
        registerUserDto.password,
      );

      const user = await this.prismaService.user.create({
        data: {
          ...registerUserDto,
          password: hashedPassword,
          roleId: clientRoleId,
        },
      });

      return user;
    } catch (error: any) {
      const isEmailTaken = error.code === 'P2002';
      if (isEmailTaken) {
        throw new ConflictException('Email is already taken');
      }

      throw error;
    }
  }

  async login() {}

  async logout() {}

  async resetPassword() {}

  async forgotPassword() {}

  async refreshToken() {}
}
