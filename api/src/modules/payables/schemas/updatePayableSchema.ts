import { z } from 'zod';

export const updatePayableSchema = z
  .object({
    value: z.number().positive().optional(),
    emissionDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Invalid date format, send in YYYY-MM-DD format',
      })
      .optional(),
    assignorId: z.string().uuid().optional(),
  })
  .required();

export type UpdatePayableDto = z.infer<typeof updatePayableSchema>;
