import { defineOptions, SeedArguments } from './types';
import { deleteUsers, createUsers } from './functions/users';
import { createRandomTasks, createTasks } from './functions/tasks';

export const options = defineOptions({
  tasks: {
    type: 'boolean',
    description: 'generate an exact set of tasks that cover all scenarios',
    short: 't',
  },
  count: {
    type: 'string',
    description: 'generate the given number of random tasks',
    short: 'c',
  },
});

export async function seed(args?: SeedArguments) {
  await deleteUsers();
  await createUsers();
  await createTasks();

  if (args?.count) {
    const count = parseInt(args.count);
    await createRandomTasks(count);
  }
}
