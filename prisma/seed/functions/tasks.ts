import { Prisma, prisma, TaskStatus } from '../../server';
import { faker } from '@faker-js/faker';

export async function deleteTasks() {
  await prisma.task.deleteMany();
}

export async function createTasks() {
  await prisma.task.createMany({
    data: [
      {
        id: 'work',
        userId: 'admin',
        title: 'Work',
        description: 'Go to Work',
      },
    ],
  });
}

export async function createRandomTasks(count: number) {
  const tasks: Prisma.TaskCreateManyInput[] = [];
  for (let j = 0; j < count; j++) {
    tasks.push({
      title: faker.book.title(),
      description: faker.animal.bird(),
      status: faker.helpers.arrayElement(Object.values(TaskStatus)),
      userId: 'user',
    });
  }
  await prisma.task.createMany({ data: tasks });
}
