import { ROLE_NAMES } from 'src/common/constants/roles.constant';
import { PrismaService } from 'src/common/services/prisma.service';

class RoleSeed {
  constructor(private readonly prismaService: PrismaService) {}

  private async createRoleSeeds() {
    const data = [
      { name: ROLE_NAMES.ADMIN, description: 'Admin role' },
      { name: ROLE_NAMES.CLIENT, description: 'Client role' },
      { name: ROLE_NAMES.SELLER, description: 'Seller role' },
    ];

    const roles = await this.prismaService.role.createMany({ data });

    return roles;
  }

  public async seed() {
    const rolesCount = await this.prismaService.role.count();
    if (rolesCount !== 0) throw new Error('Roles table is not empty');

    // create roles
    await this.createRoleSeeds();
  }
}

export default RoleSeed;
