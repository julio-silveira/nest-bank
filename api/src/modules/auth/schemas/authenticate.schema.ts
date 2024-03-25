import { z } from 'zod';

export const authenticateSchema = z
  .object({
    login: z.string(),
    password: z.string(),
  })
  .required();

export type AuthenticateDto = z.infer<typeof authenticateSchema>;
