import { z } from 'zod';

export const paginationParamsSchema = z.object({
  page: z.coerce.number().int().positive(),
  size: z.coerce.number().int().positive().optional().default(20),
});
