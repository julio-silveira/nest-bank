import { z } from 'zod';

export const createAssignorSchema = z
  .object({
    document: z.string().min(11).max(30),
    email: z.string().email(),
    phone: z.string().min(10).max(20),
    name: z.string().min(3).max(140),
  })
  .required();

export type CreateAssignorDto = z.infer<typeof createAssignorSchema>;
