import { faker } from '@faker-js/faker/locale/pt_BR';
import { Payable } from '@prisma/client';
import { CreatePayableDto } from 'src/modules/payables/schemas/createPayableSchema';
import { UpdatePayableDto } from 'src/modules/payables/schemas/updatePayableSchema';

export default class PayableGenerator {
  id: string;
  assignorId: string;
  value: number;
  emissionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  withId(id: string = faker.string.uuid()): PayableGenerator {
    this.id = id;
    return this;
  }

  withAssignorId(assignorId: string = faker.string.uuid()): PayableGenerator {
    this.assignorId = assignorId;
    return this;
  }

  withValue(value: number = faker.number.float()): PayableGenerator {
    this.value = value;
    return this;
  }

  withEmissionDate(emissionDate: Date = faker.date.recent()): PayableGenerator {
    this.emissionDate = emissionDate;
    return this;
  }

  withCreatedAt(createdAt: Date = faker.date.recent()): PayableGenerator {
    this.createdAt = createdAt;
    return this;
  }

  withUpdatedAt(updatedAt: Date = faker.date.recent()): PayableGenerator {
    this.updatedAt = updatedAt;
    return this;
  }

  withDeletedAt(deletedAt?: Date): PayableGenerator {
    this.deletedAt = deletedAt ? deletedAt : faker.date.recent();
    return this;
  }

  withAllFields(): PayableGenerator {
    this.withId()
      .withAssignorId()
      .withValue()
      .withEmissionDate()
      .withCreatedAt()
      .withUpdatedAt();

    return this;
  }

  toCreateDto(): CreatePayableDto {
    return {
      assignorId: this.assignorId,
      value: this.value,
      emissionDate: this.emissionDate.toISOString(),
    };
  }

  toUpdateDto(): UpdatePayableDto {
    const updatePayableDto: UpdatePayableDto = {};

    if (this.assignorId) {
      updatePayableDto.assignorId = this.assignorId;
    }

    if (this.value) {
      updatePayableDto.value = this.value;
    }

    if (this.emissionDate) {
      updatePayableDto.emissionDate = this.emissionDate.toISOString();
    }

    return updatePayableDto;
  }

  toModel(): Payable {
    return {
      id: this.id,
      assignorId: this.assignorId,
      value: this.value,
      emissionDate: this.emissionDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
