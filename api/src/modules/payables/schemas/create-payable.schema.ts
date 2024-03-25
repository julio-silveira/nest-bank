import { z } from 'zod';

export const createPayableSchema = z
  .object({
    value: z.number().positive(),
    emissionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Invalid date format, send in YYYY-MM-DD format',
    }),
    assignorId: z.string().uuid(),
  })
  .required();

export type CreatePayableDto = z.infer<typeof createPayableSchema>;
