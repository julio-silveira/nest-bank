import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import { PrismaService } from '../prisma/prisma.service';
import AssignorGenerator from '../../../test/generators/assignor.generator';
import { NotFoundException } from '@nestjs/common';

describe('AssignorsController', () => {
  let controller: AssignorController;
  let service: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [AssignorService, PrismaService],
    }).compile();

    controller = module.get<AssignorController>(AssignorController);
    service = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of assignors', async () => {
    const firstAssignor = new AssignorGenerator().withAllFields().toModel();
    const secondAssignor = new AssignorGenerator().withAllFields().toModel();

    const result = [firstAssignor, secondAssignor];

    jest.spyOn(service, 'findMany').mockResolvedValue(result);

    expect(await controller.findMany()).toBe(result);
  });

  it('should return a assignor', async () => {
    const assignor = new AssignorGenerator().withAllFields().toModel();

    jest.spyOn(service, 'findUnique').mockResolvedValue(assignor);

    expect(await controller.findUnique('1')).toBe(assignor);
  });

  it('should not return a assignor if it does not exist', async () => {
    jest.spyOn(service, 'findUnique').mockResolvedValue(null);

    await expect(async () => {
      await controller.findUnique('1');
    }).rejects.toThrow(NotFoundException);
  });

  it('should create a assignor', async () => {
    const assignorGenerator = new AssignorGenerator().withAllFields();
    const assignor = assignorGenerator.toModel();
    const assignorDto = assignorGenerator.toCreateDto();

    jest.spyOn(service, 'create').mockResolvedValue(assignor);

    expect(await controller.create(assignorDto)).toBe(assignor);
  });

  it('should update a assignor', async () => {
    const assignorGenerator = new AssignorGenerator().withAllFields();
    const assignor = assignorGenerator.toModel();
    const assignorDto = assignorGenerator.toUpdateDto();

    jest.spyOn(service, 'findUnique').mockResolvedValue(assignor);

    jest.spyOn(service, 'update').mockResolvedValue(assignor);

    expect(await controller.update('1', assignorDto)).toBe(assignor);
  });

  it('should not update an assignor if it does not exist', async () => {
    const assignorGenerator = new AssignorGenerator().withAllFields();
    const assignorDto = assignorGenerator.toUpdateDto();

    jest.spyOn(service, 'findUnique').mockResolvedValue(null);

    await expect(async () => {
      await controller.update('1', assignorDto);
    }).rejects.toThrow(NotFoundException);
  });

  it('should delete a assignor', async () => {
    const assignorGenerator = new AssignorGenerator().withAllFields();
    const assignor = assignorGenerator.toModel();
    jest.spyOn(service, 'findUnique').mockResolvedValue(assignor);

    jest.spyOn(service, 'delete').mockResolvedValue({
      deletedAssignorId: assignor.id,
    });

    expect(await controller.delete('1')).toBe(null);
  });

  it('should not delete a assignor if it does not exist', async () => {
    jest.spyOn(service, 'findUnique').mockResolvedValue(null);

    await expect(async () => {
      await controller.delete('1');
    }).rejects.toThrow(NotFoundException);
  });
});
