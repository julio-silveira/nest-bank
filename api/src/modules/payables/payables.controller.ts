import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { PayablesService } from './payables.service';
import {
  CreatePayableDto,
  createPayableSchema,
} from './schemas/createPayableSchema';
import { ZodValidationPipe } from 'src/infrastructure/ZodValidationPipe';
import { AssignorService } from '../assignor/assignor.service';
import {
  UpdatePayableDto,
  updatePayableSchema,
} from './schemas/updatePayableSchema';

@Controller('integration/payables')
export class PayablesController {
  constructor(
    private readonly payablesService: PayablesService,
    private readonly assignorService: AssignorService,
  ) {}

  @Get()
  async findMany() {
    const payables = await this.payablesService.findMany();
    return payables;
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    const payable = await this.payablesService.findUnique(id);
    return payable;
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createPayableSchema))
  async create(@Body() createPayableDto: CreatePayableDto) {
    const assignor = await this.assignorService.findUnique(
      createPayableDto.assignorId,
    );

    if (!assignor) {
      throw new NotFoundException('Assignor not found');
    }

    const createdPayable = await this.payablesService.create(createPayableDto);

    return createdPayable;
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updatePayableSchema))
  async update(
    @Param('id') id: string,
    @Body() updatePayableDto: UpdatePayableDto,
  ) {
    const dbPayable = await this.payablesService.findUnique(id);

    if (!dbPayable) {
      throw new NotFoundException('Payable not found');
    }

    const assignor = await this.assignorService.findUnique(
      updatePayableDto.assignorId,
    );

    if (!assignor) {
      throw new NotFoundException('New assignor not found');
    }

    const updatedPayable = await this.payablesService.update(
      id,
      updatePayableDto,
    );
    return updatedPayable;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const dbPayable = await this.payablesService.findUnique(id);

    if (!dbPayable) {
      throw new NotFoundException('Payable not found');
    }

    await this.payablesService.delete(id);
    return null;
  }
}
