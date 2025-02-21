import { PrismaService } from 'src/common/services/prisma.service';
import UserSeed from './user.seed';
import RoleSeed from './role.seed';
import { HashService } from 'src/common/services/hash.service';

class Main {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
  ) {}

  public async seed() {
    const userSeed = new UserSeed(this.prismaService, this.hashService);
    const roleSeed = new RoleSeed(this.prismaService);

    await roleSeed.seed();
    await userSeed.seed();
  }
}

const main = new Main(new PrismaService(), new HashService());

main
  .seed()
  .then(() => {
    console.log('Database seeded successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
