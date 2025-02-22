import { ConflictException, Injectable } from '@nestjs/common';
import { HashService } from 'src/common/services/hash.service';
import { RoleService } from 'src/role/role.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { isPrismaUniqueConstraintError } from 'src/common/libs/errors';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly roleService: RoleService,
    private readonly hashService: HashService,
    private readonly userRepository: UserRepository,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    try {
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
    } catch (error: any) {
      const isEmailTaken = isPrismaUniqueConstraintError(error);
      if (isEmailTaken) {
        throw new ConflictException('Email is already taken');
      }

      throw error;
    }
  }
}
