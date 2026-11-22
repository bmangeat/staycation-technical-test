import { randomUUID } from 'node:crypto';

import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { pinoHttp } from 'pino-http';
import { type Logger } from 'pino';
import { UserService } from './services/user.service';
import { createUsersRouter } from './routes/user.route';
import { UserRepository } from './repositories/user.repository';
import { HotelService } from './services/hotel.service';
import { HotelsRepository } from './repositories/hotel.repository';
import { createHotelRouter } from './routes/hotel.route';
import { OpeningRepository } from './repositories/opening.repository';
import { SaleDatesRepository } from './repositories/sale-dates.repository';
import { createErrorHandler } from './middlewares/error-handler';

const REQUEST_ID_PATTERN = /^[\w.-]{1,128}$/;

export function createApp(logger: Logger): Express {
  const app = express();
  app.use(express.json());

  app.use(helmet());
  // For the exercise allow all origins
  // ⚠ For production need to configure it
  app.use(cors());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 64,
  });
  app.use(limiter);

  // logger
  app.use(
    pinoHttp({
      logger,
      genReqId: (req, res) => {
        const incoming = req.headers['x-request-id'];
        const id =
          typeof incoming === 'string' && REQUEST_ID_PATTERN.test(incoming)
            ? incoming
            : randomUUID();
        res.setHeader('x-request-id', id);
        return id;
      },
    }),
  );

  // routing
  const userService = new UserService(new UserRepository());
  app.use('/users', createUsersRouter(userService));

  const hotelService = new HotelService(
    new HotelsRepository(),
    new OpeningRepository(),
    new SaleDatesRepository(),
  );
  app.use('/hotels', createHotelRouter(hotelService));
  app.use(createErrorHandler(logger));

  return app;
}
