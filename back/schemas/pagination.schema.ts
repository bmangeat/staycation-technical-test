import { z } from 'zod';

export const paginationParamsSchema = z.object({
  page: z.coerce.number().int(),
  size: z.coerce.number().int().positive(),
});
