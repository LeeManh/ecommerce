import { Prisma } from '@prisma/client';

export type IPrismaModelMethods =
  | 'findUnique'
  | 'findUniqueOrThrow'
  | 'findFirst'
  | 'findFirstOrThrow'
  | 'findMany'
  | 'create'
  | 'createMany'
  | 'createManyAndReturn'
  | 'delete'
  | 'update'
  | 'deleteMany'
  | 'updateMany'
  | 'upsert'
  | 'aggregate'
  | 'groupBy'
  | 'count';

export type IPrismaModelMethodArgs<
  T extends Capitalize<Prisma.ModelName>,
  M extends IPrismaModelMethods,
> = Prisma.TypeMap['model'][T]['operations'][M]['args'];

export type IPrismaModelMethodResults<
  T extends Capitalize<Prisma.ModelName>,
  M extends IPrismaModelMethods,
> = Prisma.TypeMap['model'][T]['operations'][M]['result'];
