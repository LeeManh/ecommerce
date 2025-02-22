import { Prisma } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';
import {
  IPrismaModelMethodArgs,
  IPrismaModelMethodResults,
} from '../types/repository.type';
import { BaseRepositoryInterface } from './base-interface.repository';

export abstract class BaseAbstractRepository<
  ModelName extends Capitalize<Prisma.ModelName>,
> implements BaseRepositoryInterface<ModelName>
{
  constructor(
    public readonly prisma: PrismaService,
    public readonly model: Uncapitalize<ModelName>,
  ) {}

  public async findUnique(
    args: IPrismaModelMethodArgs<ModelName, 'findUnique'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'findUnique'>> {
    return await this.prisma[this.model]['findUnique'].call(this, args);
  }

  public async findUniqueOrThrow(
    args: IPrismaModelMethodArgs<ModelName, 'findUniqueOrThrow'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'findUniqueOrThrow'>> {
    return await this.prisma[this.model]['findUniqueOrThrow'].call(this, args);
  }

  public async findFirst(
    args: IPrismaModelMethodArgs<ModelName, 'findFirst'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'findFirst'>> {
    return await this.prisma[this.model]['findFirst'].call(this, args);
  }

  public async findFirstOrThrow(
    args: IPrismaModelMethodArgs<ModelName, 'findFirstOrThrow'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'findFirstOrThrow'>> {
    return await this.prisma[this.model]['findFirstOrThrow'].call(this, args);
  }

  public async findMany(
    args: IPrismaModelMethodArgs<ModelName, 'findMany'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'findMany'>> {
    return await this.prisma[this.model]['findMany'].call(this, args);
  }

  public async create(
    args: IPrismaModelMethodArgs<ModelName, 'create'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'create'>> {
    return await this.prisma[this.model]['create'].call(this, args);
  }

  public async createMany(
    args: IPrismaModelMethodArgs<ModelName, 'createMany'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'createMany'>> {
    return await this.prisma[this.model]['createMany'].call(this, args);
  }

  public async createManyAndReturn(
    args: IPrismaModelMethodArgs<ModelName, 'createManyAndReturn'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'createManyAndReturn'>> {
    return await this.prisma[this.model]['createManyAndReturn'].call(
      this,
      args,
    );
  }

  public async delete(
    args: IPrismaModelMethodArgs<ModelName, 'delete'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'delete'>> {
    return await this.prisma[this.model]['delete'].call(this, args);
  }

  public async deleteMany(
    args: IPrismaModelMethodArgs<ModelName, 'deleteMany'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'deleteMany'>> {
    return await this.prisma[this.model]['deleteMany'].call(this, args);
  }

  public async softDelete(
    args: IPrismaModelMethodArgs<ModelName, 'update'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'update'>> {
    return await this.prisma[this.model]['update'].call(this, {
      where: args.where,
      data: { deletedAt: new Date() },
    });
  }

  public async softDeleteMany(
    args: IPrismaModelMethodArgs<ModelName, 'updateMany'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'updateMany'>> {
    return await this.prisma[this.model]['updateMany'].call(this, {
      where: args.where,
      data: { deletedAt: new Date() },
    });
  }

  public async update(
    args: IPrismaModelMethodArgs<ModelName, 'update'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'update'>> {
    return await this.prisma[this.model]['update'].call(this, args);
  }

  public async updateMany(
    args: IPrismaModelMethodArgs<ModelName, 'updateMany'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'updateMany'>> {
    return await this.prisma[this.model]['updateMany'].call(this, args);
  }

  public async upsert(
    args: IPrismaModelMethodArgs<ModelName, 'upsert'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'upsert'>> {
    return await this.prisma[this.model]['upsert'].call(this, args);
  }

  public async aggregate(
    args: IPrismaModelMethodArgs<ModelName, 'aggregate'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'aggregate'>> {
    return await this.prisma[this.model]['aggregate'].call(this, args);
  }

  public async groupBy(
    args: IPrismaModelMethodArgs<ModelName, 'groupBy'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'groupBy'>> {
    return await this.prisma[this.model]['groupBy'].call(this, args);
  }

  public async count(
    args: IPrismaModelMethodArgs<ModelName, 'count'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'count'>> {
    return await this.prisma[this.model]['count'].call(this, args);
  }
}
