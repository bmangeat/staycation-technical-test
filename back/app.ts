import { randomUUID } from 'node:crypto';

import express, { type Express } from 'express'
import cors from 'cors'
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';
import { type Logger } from 'pino';
import { UsersService } from './services/user.service';
import { createUsersRouter } from './routes/user.route';
import { UsersRepository } from './repositories/user.repository';

const REQUEST_ID_PATTERN = /^[\w.-]{1,128}$/;

export function createApp(logger: Logger): Express {
  const app = express()
 app.use(express.json());

  const usersService = new UsersService(new UsersRepository());
  app.use('/users', createUsersRouter(usersService));
  app.use(pinoHttp(
    {
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
    }
  ))
  app.use(helmet())
  app.use(cors())
  return app;
}

