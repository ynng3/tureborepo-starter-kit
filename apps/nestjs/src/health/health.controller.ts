import { Controller, Get } from '@nestjs/common';
import { getDatabaseHealth } from '@repo/database';

@Controller('health')
export class HealthController {
  @Get()
  async getHealth() {
    const health = await getDatabaseHealth();

    return {
      app: 'Turborepo Starter Kit',
      framework: 'NestJS',
      status: health.ok ? 'ok' : 'error',
      database: health,
    };
  }
}
