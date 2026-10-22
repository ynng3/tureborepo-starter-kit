import { Controller, Get } from '@nestjs/common';
import { prisma } from '@repo/database';

@Controller('users')
export class UsersController {
  @Get()
  async getUsers() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      app: 'Turborepo Starter Kit',
      framework: 'NestJS',
      users,
    };
  }
}
