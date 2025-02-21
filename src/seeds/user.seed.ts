import { PrismaService } from 'src/common/services/prisma.service';
import { faker } from '@faker-js/faker';
import { ROLE_NAMES } from 'src/common/constants/roles.constant';
import { HashService } from 'src/common/services/hash.service';

class UserSeed {
  private readonly password = '123456';
  private readonly emailAdmin = 'leem28@gmail.com';

  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
  ) {}

  private async createUserSeeds() {
    const roles = await this.prismaService.role.findMany();

    if (roles.length === 0) {
      throw new Error('No roles found. Please seed roles first.');
    }

    const hashPassword = await this.hashService.hash(this.password);
    const data = roles.map((role) => ({
      email:
        role.name === ROLE_NAMES.ADMIN
          ? this.emailAdmin
          : faker.internet.email(),
      password: hashPassword,
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      roleId: role.id,
    }));

    const users = await this.prismaService.user.createMany({ data });

    return users;
  }

  public async seed() {
    await this.createUserSeeds();
  }
}

export default UserSeed;
