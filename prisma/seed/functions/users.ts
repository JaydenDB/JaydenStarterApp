import { prisma } from '../../server';

export async function deleteUsers() {
  await prisma.user.deleteMany();
}

export async function createUsers() {
  await prisma.user.createMany({
    data: [
      {
        id: 'admin',
        roles: ['admin'],
        accountType: 'Student',
        netId: 'admin',
        firstName: 'Admin',
        lastName: 'Smith',
        preferredFirstName: 'Admin',
        preferredLastName: 'Smith',
      },
      {
        id: 'user',
        roles: ['user'],
        accountType: 'Student',
        netId: 'user',
        firstName: 'User',
        lastName: 'Smith',
        preferredFirstName: 'User',
        preferredLastName: 'Smith',
      },
    ],
  });
}
