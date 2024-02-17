import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { PayablesService } from './payables.service';
import {
  CreatePayableDto,
  createPayableSchema,
} from './schemas/createPayableSchema';
import { ZodValidationPipe } from 'src/infrastructure/ZodValidationPipe';

@Controller('integration/payables')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPayableSchema))
  async create(@Body() createPayableDto: CreatePayableDto) {
    return createPayableDto;
  }
}
