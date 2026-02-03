import { z } from 'zod';
import { authorizedProcedure } from '../../trpc';
import { prisma, TaskStatus } from '../../../../../prisma/server';
import { sleep } from '@trpc/server/unstable-core-do-not-import';

const getTasksByUserInput = z.object({
  pageSize: z.number(),
  pageOffset: z.number(),
});

const getTasksByUserOutput = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      title: z.string(),
      description: z.string(),
      completedDate: z.date().nullable(),
      userId: z.string(),
      status: z.literal(Object.values(TaskStatus)),
    })
  ),
  totalCount: z.number(),
});

export const getTasksByUser = authorizedProcedure
  .meta({ requiredPermissions: ['manage-tasks'] })
  .input(getTasksByUserInput)
  .output(getTasksByUserOutput)
  .mutation(async opts => {
    await sleep(5000);
    const { pageSize, pageOffset } = opts.input;

    const totalCount = await prisma.task.count({
      where: {
        userId: opts.ctx.userId,
      },
    });

    const data = await prisma.task.findMany({
      where: {
        userId: opts.ctx.userId,
      },
      orderBy: { createdAt: 'desc' },
      skip: pageOffset,
      take: pageSize,
    });
    return { data, totalCount };
  });
