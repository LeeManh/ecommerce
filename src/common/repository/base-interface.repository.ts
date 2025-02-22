import { Prisma } from '@prisma/client';
import {
  IPrismaModelMethodArgs,
  IPrismaModelMethodResults,
} from '../types/repository.type';

export interface BaseRepositoryInterface<
  ModelName extends Capitalize<Prisma.ModelName>,
> {
  findUnique(
    args: IPrismaModelMethodArgs<ModelName, 'findUnique'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'findUnique'>>;

  findUniqueOrThrow(
    args: IPrismaModelMethodArgs<ModelName, 'findUniqueOrThrow'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'findUniqueOrThrow'>>;

  findFirst(
    args: IPrismaModelMethodArgs<ModelName, 'findFirst'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'findFirst'>>;

  findFirstOrThrow(
    args: IPrismaModelMethodArgs<ModelName, 'findFirstOrThrow'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'findFirstOrThrow'>>;

  findMany(
    args: IPrismaModelMethodArgs<ModelName, 'findMany'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'findMany'>>;

  create(
    args: IPrismaModelMethodArgs<ModelName, 'create'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'create'>>;

  createMany(
    args: IPrismaModelMethodArgs<ModelName, 'createMany'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'createMany'>>;

  createManyAndReturn(
    args: IPrismaModelMethodArgs<ModelName, 'createManyAndReturn'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'createManyAndReturn'>>;

  delete(
    args: IPrismaModelMethodArgs<ModelName, 'delete'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'delete'>>;

  deleteMany(
    args: IPrismaModelMethodArgs<ModelName, 'deleteMany'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'deleteMany'>>;

  softDelete(
    args: IPrismaModelMethodArgs<ModelName, 'update'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'update'>>;

  softDeleteMany(
    args: IPrismaModelMethodArgs<ModelName, 'updateMany'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'updateMany'>>;

  update(
    args: IPrismaModelMethodArgs<ModelName, 'update'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'update'>>;

  updateMany(
    args: IPrismaModelMethodArgs<ModelName, 'updateMany'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'updateMany'>>;

  upsert(
    args: IPrismaModelMethodArgs<ModelName, 'upsert'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'upsert'>>;

  aggregate(
    args: IPrismaModelMethodArgs<ModelName, 'aggregate'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'aggregate'>>;

  groupBy(
    args: IPrismaModelMethodArgs<ModelName, 'groupBy'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'groupBy'>>;

  count(
    args: IPrismaModelMethodArgs<ModelName, 'count'>,
  ): Promise<IPrismaModelMethodResults<ModelName, 'count'>>;
}
