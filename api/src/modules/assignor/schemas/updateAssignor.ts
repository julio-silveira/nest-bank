import { z } from 'zod';

export const updateAssignorSchema = z.object({
  document: z.string().min(11).max(30).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(20).optional(),
  name: z.string().min(3).max(140).optional(),
});

export type UpdateAssignorDto = z.infer<typeof updateAssignorSchema>;
