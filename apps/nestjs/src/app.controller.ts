import { Controller, Get } from '@nestjs/common';
import { BASE_API_URL } from './config';

@Controller()
export class AppController {
  @Get()
  getAppInfo() {
    return {
      app: 'Turborepo Starter Kit',
      api: BASE_API_URL,
      framework: 'NestJS',
    };
  }
}
