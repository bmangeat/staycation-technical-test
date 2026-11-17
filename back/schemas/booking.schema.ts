import { z } from 'zod';

export const bookingListParamsSchema = z.object({
  page: z.coerce.number().int().positive(),
  size: z.coerce.number().int().positive(),
});

export const bookingIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});
