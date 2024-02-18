import { Test, TestingModule } from '@nestjs/testing';
import { PayablesController } from './payables.controller';
import { PayablesService } from './payables.service';
import { AssignorService } from '../assignor/assignor.service';
import PayableGenerator from '../../../test/generators/payables.generator';
import AssignorGenerator from '../../../test/generators/assignor.generator';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

describe('PayablesController', () => {
  let controller: PayablesController;
  let service: PayablesService;
  let assignorService: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayablesController],
      providers: [PayablesService, AssignorService, PrismaService],
    }).compile();

    controller = module.get<PayablesController>(PayablesController);
    service = module.get<PayablesService>(PayablesService);
    assignorService = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of payables', async () => {
    const firstPayable = new PayableGenerator().withAllFields().toModel();
    const secondPayable = new PayableGenerator().withAllFields().toModel();

    const result = [firstPayable, secondPayable];

    jest.spyOn(service, 'findMany').mockResolvedValue(result);

    expect(await controller.findMany()).toBe(result);
  });

  it('should return a payable', async () => {
    const payable = new PayableGenerator().withAllFields().toModel();

    jest.spyOn(service, 'findUnique').mockResolvedValue(payable);

    expect(await controller.findUnique('1')).toBe(payable);
  });

  it('should create a payable', async () => {
    const payableGenerator = new PayableGenerator().withAllFields();
    const payable = payableGenerator.toModel();
    const payableDto = payableGenerator.toCreateDto();

    const assignor = new AssignorGenerator().withAllFields().toModel();

    jest.spyOn(assignorService, 'findUnique').mockResolvedValue(assignor);
    jest.spyOn(service, 'create').mockResolvedValue(payable);

    expect(await controller.create(payableDto)).toBe(payable);
  });

  it('should not create a payable if assignor does not exist', async () => {
    const payableGenerator = new PayableGenerator().withAllFields();
    const payableDto = payableGenerator.toCreateDto();

    jest.spyOn(assignorService, 'findUnique').mockResolvedValue(null);

    await expect(async () => {
      await controller.create(payableDto);
    }).rejects.toThrow(NotFoundException);
  });

  it('should update a payable', async () => {
    const payableGenerator = new PayableGenerator().withAllFields();
    const payable = payableGenerator.toModel();
    const payableDto = payableGenerator.toUpdateDto();

    const assignor = new AssignorGenerator().withAllFields().toModel();

    jest.spyOn(assignorService, 'findUnique').mockResolvedValue(assignor);
    jest.spyOn(service, 'findUnique').mockResolvedValue(payable);
    jest.spyOn(service, 'update').mockResolvedValue(payable);

    expect(await controller.update('1', payableDto)).toBe(payable);
  });

  it('should not update a payable if it does not exist', async () => {
    const payableGenerator = new PayableGenerator().withAllFields();
    const payableDto = payableGenerator.toUpdateDto();

    const assignor = new AssignorGenerator().withAllFields().toModel();

    jest.spyOn(assignorService, 'findUnique').mockResolvedValue(assignor);
    jest.spyOn(service, 'findUnique').mockResolvedValue(null);

    await expect(async () => {
      await controller.update('1', payableDto);
    }).rejects.toThrow(NotFoundException);
  });

  it('should delete a payable', async () => {
    const payableGenerator = new PayableGenerator().withAllFields();
    const payable = payableGenerator.toModel();

    const assignor = new AssignorGenerator().withAllFields().toModel();

    jest.spyOn(assignorService, 'findUnique').mockResolvedValue(assignor);
    jest.spyOn(service, 'findUnique').mockResolvedValue(payable);
    jest
      .spyOn(service, 'delete')
      .mockResolvedValue({ deletedPayableId: payable.id });

    expect(await controller.delete('1')).toStrictEqual(null);
  });

  it('should not delete a payable if it does not exist', async () => {
    jest.spyOn(service, 'findUnique').mockResolvedValue(null);

    const assignor = new AssignorGenerator().withAllFields().toModel();

    jest.spyOn(assignorService, 'findUnique').mockResolvedValue(assignor);
    await expect(async () => {
      await controller.delete('1');
    }).rejects.toThrow(NotFoundException);
  });
});
