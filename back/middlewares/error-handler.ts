import type { ErrorRequestHandler } from 'express';
import type { Logger } from 'pino';
import { ZodError } from 'zod';
import { formatZodError } from '@/lib/zod';

export const createErrorHandler = (logger: Logger): ErrorRequestHandler =>
  (err, _req, res) => {
    if (err instanceof ZodError) {
      res.status(400).json({ message: formatZodError(err) });
      return;
    }
    logger.error(err);
    res.status(500).json({ message: 'Internal server error' });
  };