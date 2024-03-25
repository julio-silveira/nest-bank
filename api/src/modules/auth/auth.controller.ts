import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ZodValidationPipe } from '../../infrastructure/ZodValidationPipe';
import {
  AuthenticateDto,
  authenticateSchema,
} from './schemas/authenticate.schema';

@Controller('integration/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateSchema))
  async authenticate(@Body() body: AuthenticateDto) {
    return body;
  }
}
