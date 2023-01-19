import config from 'config';
import express from 'express';

// middlewares
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

import { plants, referentiel } from './data';
import unavailabilitiesDump from './data/unavailabilitiesDump';
import { RTEServiceError } from './rteApi';

import {
  errorHandlerMiddleware,
  logRequestMiddleware,
  addRequestIdMiddleware,
  notFoundMiddleware,
} from './utils/middlewares';

import { getUnavailabilities, getUnavailabilitiesV2 } from './services';
import { groupByKey } from './utils/helpers';
import { getUnavailabilitiesV3 } from './services/unavailabilities';

function serviceWrapper(service, environment) {
  return async function wrappedService(req, res, next) {
    try {
      const data = await service(req.query, environment);
      res.json(data);
    } catch (err) {
      if (err instanceof RTEServiceError) {
        res.statusCode = 500;
        res.json(err.toObject());
        return;
      }

      next(err);
    }
  };
}

const buildApi = (environment) => {
  const app = express();
  const { logger } = environment;

  app.use(addRequestIdMiddleware());
  app.use(logRequestMiddleware(logger));
  app.use(helmet());
  app.use(compression());
  app.use(cors(config.get('api.cors')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/plants', (req, res) => {
    res.json(plants);
  });
  app.get(
    '/unavailabilities',
    serviceWrapper(getUnavailabilities, environment),
  );
  app.get('/unavailabilitiesDump', (req, res) =>
    res.json(unavailabilitiesDump),
  );
  app.get(
    '/unavailabilitiesv2',
    serviceWrapper(getUnavailabilitiesV2, environment),
  );
  app.get(
    '/unavailabilitiesv3',
    serviceWrapper(getUnavailabilitiesV3, environment),
  );

  if (process.env.NODE_ENV !== 'production') {
    app.get('/token', (req, res) => {
      res.json({ token: environment.rteToken });
    });
  }

  app.get('/_status', (req, res) => {
    res.json({ status: 'OK' });
  });
  app.get('/referentiel', (req, res) => {
    const groupedData = groupByKey(referentiel, 'filiere');
    res.json({
      length: groupedData.length,
      types: groupedData,
    });
  });

  app.use(notFoundMiddleware());
  app.use(errorHandlerMiddleware(logger));

  return app;
};

export default buildApi;
