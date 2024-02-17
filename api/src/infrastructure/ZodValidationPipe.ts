import { PipeTransform, HttpException, HttpStatus } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      const parsedErrors = error.errors.map((err: any) => ({
        field: err.path.join('.'),
        message: err.message,
        errorCode: err.code.toUpperCase(),
      }));
      throw new HttpException(
        {
          message: 'Failed to validate request body',
          error_code: 'VALIDATION_ERROR',
          errors: parsedErrors,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
