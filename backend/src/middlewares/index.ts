import cors from 'cors';
import express, { Application } from 'express';
import { globalError } from '../middlewares/globalError';
import { logger } from '../middlewares/logger';
import routes from '../routes';

const applyMiddleware = (app: Application): void => {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger);
  app.use(routes);
  app.use(globalError);
};

export { applyMiddleware };
