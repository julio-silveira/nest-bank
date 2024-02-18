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
import { AssignorService } from './assignor.service';
import {
  CreateAssignorDto,
  createAssignorSchema,
} from './schemas/createAssignor';
import { ZodValidationPipe } from 'src/infrastructure/ZodValidationPipe';
import {
  UpdateAssignorDto,
  updateAssignorSchema,
} from './schemas/updateAssignor';

@Controller('integration/assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Get()
  async findMany() {
    const assignors = await this.assignorService.findMany();
    return assignors;
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    const assignor = await this.assignorService.findUnique(id);
    return assignor;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createAssignorSchema))
  async create(@Body() createPayableDto: CreateAssignorDto) {
    const createdAssignor = await this.assignorService.create(createPayableDto);
    return createdAssignor;
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateAssignorSchema))
  async update(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    const dbAssignor = await this.assignorService.findUnique(id);

    if (!dbAssignor) {
      throw new NotFoundException('Assignor not found');
    }

    const updatedAssignor = await this.assignorService.update(
      id,
      updateAssignorDto,
    );
    return updatedAssignor;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const dbAssignor = await this.assignorService.findUnique(id);

    if (!dbAssignor) {
      throw new NotFoundException('Assignor not found');
    }

    await this.assignorService.delete(id);
    return null;
  }
}
