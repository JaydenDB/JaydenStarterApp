import { z } from 'zod';
import { authorizedProcedure } from '../../trpc';
import { prisma, TaskStatus } from '../../../../../prisma/server';
import { rethrowKnownPrismaError } from '@fhss-web-team/backend-utils';

const updateTaskInput = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(TaskStatus),
});

const updateTaskOutput = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(TaskStatus),
  completedDate: z.date().nullable(),
});

export const updateTask = authorizedProcedure
  .meta({ requiredPermissions: ['manage-tasks'] })
  .input(updateTaskInput)
  .output(updateTaskOutput)
  .mutation(async opts => {
    try {
      const updatedTask = await prisma.task.update({
        where: {
          id: opts.input.id,
          userId: opts.ctx.userId,
        },
        data: {
          title: opts.input.title,
          description: opts.input.description,
          status: opts.input.status,
          completedDate: opts.input.status === 'Complete' ? new Date() : null,
        },
      });

      return updatedTask;
    } catch (error) {
      rethrowKnownPrismaError(error);
      throw error;
    }
  });
