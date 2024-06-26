import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePayableDto } from './schemas/create-payable.schema';
import { UpdatePayableDto } from './schemas/update-payable.schema';
import { Payable } from '@prisma/client';

@Injectable()
export class PayablesService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany() {
    const payables = this.prisma.payable.findMany({
      where: { deletedAt: null },
    });
    return payables;
  }

  async findUnique(id: string): Promise<Payable | null> {
    const payable = await this.prisma.payable.findUnique({
      where: { id, deletedAt: null },
    });

    return payable;
  }

  async create(data: CreatePayableDto) {
    const createdPayable = await this.prisma.payable.create({ data });

    return createdPayable;
  }

  async update(id: string, data: UpdatePayableDto) {
    const updatedPayable = await this.prisma.payable.update({
      where: { id },
      data,
    });

    return updatedPayable;
  }

  async delete(id: string) {
    const deletedPayable = await this.prisma.payable.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return {
      deletedPayableId: deletedPayable.id,
    };
  }
}
