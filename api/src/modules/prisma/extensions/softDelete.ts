import { Prisma } from '@prisma/client';

export const softDelete = {
  name: 'softDelete',
  model: {
    $allModels: {
      async softDelete<T>(
        model: T,
        where: Prisma.Args<T, 'delete'>['where'],
      ): Promise<boolean> {
        const context = Prisma.getExtensionContext(model);

        const result = await (context as any).update({
          where,
          data: { deletedAt: new Date() },
        });

        return !!result;
      },
    },
  },
  query: {
    $allModels: {
      async $allOperations({ operation, args, query }) {
        const findActions = ['findUnique', 'findMany', 'findFirst'];
        if (findActions.includes(operation)) {
          return query({ ...args, where: { deletedAt: null } });
        }
        return query(args);
      },
    },
  },
};
