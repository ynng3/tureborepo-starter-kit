import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: Record<string, unknown>) {
    try {
      const result = await this.authService.registerUser(body ?? {});
      return {
        message: 'User registered successfully.',
        ...result,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      const status = message === 'User already exists.' ? HttpStatus.CONFLICT : message.includes('required') ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;

      throw new HttpException(
        {
          message: status === HttpStatus.INTERNAL_SERVER_ERROR ? 'User registration failed.' : message,
          error: status === HttpStatus.INTERNAL_SERVER_ERROR ? (error instanceof Error ? error.message : 'Unknown error') : undefined,
        },
        status,
      );
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: Record<string, unknown>) {
    try {
      const result = await this.authService.loginUser(body ?? {});
      return {
        message: 'Login successful.',
        ...result,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      const status = message === 'Invalid credentials.' ? HttpStatus.UNAUTHORIZED : message.includes('required') ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;

      throw new HttpException(
        {
          message: status === HttpStatus.INTERNAL_SERVER_ERROR ? 'Login failed.' : message,
          error: status === HttpStatus.INTERNAL_SERVER_ERROR ? (error instanceof Error ? error.message : 'Unknown error') : undefined,
        },
        status,
      );
    }
  }
}
