import { Test, TestingModule } from '@nestjs/testing';
import { PayablesService } from './payables.service';
import { PrismaService } from '../prisma/prisma.service';
import PayableGenerator from '../../../test/generators/payables.generator';

describe('PayablesService', () => {
  let service: PayablesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'PrismaService',
          useValue: {
            payable: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        PrismaService,
        PayablesService,
      ],
    }).compile();

    service = module.get<PayablesService>(PayablesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of payables', async () => {
    const payableGenerator = new PayableGenerator().withAllFields().toModel();

    jest
      .spyOn(prisma.payable, 'findMany')
      .mockResolvedValue([payableGenerator]);

    expect(await service.findMany()).toStrictEqual([payableGenerator]);
  });

  it('should return a payable', async () => {
    const payableGenerator = new PayableGenerator().withAllFields().toModel();

    jest
      .spyOn(prisma.payable, 'findUnique')
      .mockResolvedValue(payableGenerator);

    expect(await service.findUnique('1')).toStrictEqual(payableGenerator);
  });

  it('should create a payable', async () => {
    const payableGenerator = new PayableGenerator().withAllFields();
    const payable = payableGenerator.toModel();
    const payableDto = payableGenerator.toCreateDto();

    jest.spyOn(prisma.payable, 'create').mockResolvedValue(payable);

    expect(await service.create(payableDto)).toStrictEqual(payable);
  });

  it('should update a payable', async () => {
    const payableGenerator = new PayableGenerator().withAllFields();
    const payable = payableGenerator.toModel();
    const payableDto = payableGenerator.toUpdateDto();

    jest.spyOn(prisma.payable, 'findFirst').mockResolvedValue(payable);

    jest.spyOn(prisma.payable, 'update').mockResolvedValue(payable);

    expect(await service.update('1', payableDto)).toStrictEqual(payable);
  });

  it('should delete a payable', async () => {
    const payableGenerator = new PayableGenerator().withAllFields();
    const payable = payableGenerator.toModel();

    jest.spyOn(prisma.payable, 'update').mockResolvedValue(payable);

    expect(await service.delete('1')).toStrictEqual({
      deletedPayableId: payable.id,
    });
  });
});
