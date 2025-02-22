import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class RoleService {
  private clientRoleId: number | null = null;

  constructor(private readonly prismaService: PrismaService) {}

  public async getClientRoleId(): Promise<number> {
    if (this.clientRoleId) return this.clientRoleId;

    const clientRole = await this.prismaService.role.findFirstOrThrow({
      where: { name: 'client' },
    });

    this.clientRoleId = clientRole.id;
    return this.clientRoleId;
  }
}
