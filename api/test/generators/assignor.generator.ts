import { faker } from '@faker-js/faker/locale/pt_BR';
import { Assignor } from '@prisma/client';
import fakeDocument from './document.fake.generator';
import { CreateAssignorDto } from 'src/modules/assignor/schemas/createAssignor';
import { UpdateAssignorDto } from 'src/modules/assignor/schemas/updateAssignor';

export default class PayableGenerator {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  withId(id?: string): PayableGenerator {
    this.id = id ? id : faker.string.uuid();
    return this;
  }

  withDocument({
    document = undefined,
    type = 'cpf',
    withSeparators = false,
  }: {
    document?: string;
    type: 'cpf' | 'cnpj';
    withSeparators?: boolean;
  }): PayableGenerator {
    if (!document) {
      this.document = fakeDocument[type]({ withSeparators });
    } else {
      this.document = document;
    }
    return this;
  }

  withEmail(email: string = faker.internet.email()): PayableGenerator {
    this.email = email;
    return this;
  }

  withPhone(phone: string = faker.phone.number()): PayableGenerator {
    this.phone = phone;
    return this;
  }

  withName(name: string = faker.person.fullName()): PayableGenerator {
    this.name = name;
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

  toCreateDto(): CreateAssignorDto {
    return {
      document: this.document,
      email: this.email,
      phone: this.phone,
      name: this.name,
    };
  }

  toUpdateDto(): UpdateAssignorDto {
    const updatePayableDto: UpdateAssignorDto = {};

    if (this.document) {
      updatePayableDto.document = this.document;
    }

    if (this.email) {
      updatePayableDto.email = this.email;
    }

    if (this.phone) {
      updatePayableDto.phone = this.phone;
    }

    if (this.name) {
      updatePayableDto.name = this.name;
    }

    return updatePayableDto;
  }

  toModel(): Assignor {
    return {
      id: this.id,
      document: this.document,
      email: this.email,
      phone: this.phone,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
