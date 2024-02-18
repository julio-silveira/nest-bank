import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignorDto } from './schemas/createAssignor';

@Injectable()
export class AssignorService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany() {
    return this.prismaService.assignor.findMany({ where: { deletedAt: null } });
  }

  async findUnique(id: string) {
    const assignor = await this.prismaService.assignor.findUnique({
      where: { id, deletedAt: null },
    });

    return assignor;
  }

  async create(createData: CreateAssignorDto) {
    const createdAssignor = await this.prismaService.assignor.create({
      data: createData,
    });

    return createdAssignor;
  }

  async update(id: string, updateData: CreateAssignorDto) {
    const updatedAssignor = await this.prismaService.assignor.update({
      where: { id },
      data: updateData,
    });

    return updatedAssignor;
  }

  async delete(id: string) {
    const deletedAssignor = await this.prismaService.assignor.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return {
      deletedAssignorId: deletedAssignor.id,
    };
  }
}
