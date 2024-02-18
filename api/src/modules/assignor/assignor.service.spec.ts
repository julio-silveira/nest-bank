import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { PrismaService } from '../prisma/prisma.service';
import AssignorGenerator from '../../../test/generators/assignor.generator';

describe('PayablesService', () => {
  let service: AssignorService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'PrismaService',
          useValue: {
            assignor: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        PrismaService,
        AssignorService,
      ],
    }).compile();

    service = module.get<AssignorService>(AssignorService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a assignor', async () => {
    const assignorGenerator = new AssignorGenerator().withAllFields();

    const assignorCreateDto = assignorGenerator.toCreateDto();

    const expectedAssignor = assignorGenerator.toModel();

    jest.spyOn(prisma.assignor, 'create').mockResolvedValue(expectedAssignor);

    const result = await service.create(assignorCreateDto);

    expect(prisma.assignor.create).toHaveBeenCalledWith({
      data: assignorCreateDto,
    });

    expect(result).toEqual(expectedAssignor);
  });

  it('should find all assignors', async () => {
    const assignorGenerator = new AssignorGenerator().withAllFields();

    const expectedAssignors = [assignorGenerator.toModel()];

    jest
      .spyOn(prisma.assignor, 'findMany')
      .mockResolvedValue(expectedAssignors);

    const result = await service.findMany();

    expect(prisma.assignor.findMany).toHaveBeenCalledWith({
      where: { deletedAt: null },
    });

    expect(result).toEqual(expectedAssignors);
  });

  it('should find a assignor by id', async () => {
    const assignorGenerator = new AssignorGenerator().withAllFields();

    const expectedAssignor = assignorGenerator.toModel();

    const assignorId = assignorGenerator.getId();

    jest
      .spyOn(prisma.assignor, 'findUnique')
      .mockResolvedValue(expectedAssignor);

    const result = await service.findUnique(assignorId);

    expect(prisma.assignor.findUnique).toHaveBeenCalledWith({
      where: { id: assignorId, deletedAt: null },
    });

    expect(result).toEqual(expectedAssignor);
  });

  it('should update a assignor', async () => {
    const assignorGenerator = new AssignorGenerator().withEmail().withName();

    const assignorUpdateDto = assignorGenerator.toUpdateDto();

    const expectedAssignor = assignorGenerator.toModel();

    const assignorId = assignorGenerator.getId();

    jest.spyOn(prisma.assignor, 'update').mockResolvedValue(expectedAssignor);

    const result = await service.update(assignorId, assignorUpdateDto);

    expect(prisma.assignor.update).toHaveBeenCalledWith({
      where: { id: assignorId },
      data: assignorUpdateDto,
    });

    expect(result).toEqual(expectedAssignor);
  });

  it('should delete a assignor', async () => {
    const assignorGenerator = new AssignorGenerator().withAllFields();

    const expectedAssignor = assignorGenerator.toModel();

    const assignorId = assignorGenerator.getId();

    jest.spyOn(prisma.assignor, 'update').mockResolvedValue(expectedAssignor);

    const result = await service.delete(assignorId);

    expect(prisma.assignor.update).toHaveBeenCalledWith({
      where: { id: assignorId },
      data: { deletedAt: expect.any(Date) },
    });

    expect(result).toEqual({ deletedAssignorId: expectedAssignor.id });
  });
});
