import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { HashService } from 'src/common/services/hash.service';
import { User, UserStatus } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  public async validateExitsEmail(email: string): Promise<User | null> {
    const existingUser = await this.userRepository.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    return existingUser;
  }

  public async validateEmailVerified(email: string) {
    // Validate Email already exists
    const user = await this.userRepository.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Email is not registered');
    }

    // Validate Email has been verified
    if (user?.status !== UserStatus.INACTIVE) {
      throw new BadRequestException('Email has been verified');
    }
  }

  public async create(createUserDto: CreateUserDto) {
    await this.validateExitsEmail(createUserDto.email);

    const hashedPassword = await this.hashService.hash(createUserDto.password);

    return await this.userRepository.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }
  public async findByEmail(email: string) {
    return this.userRepository.findUnique({
      where: { email },
      include: { role: true },
    });
  }
}
