import { assocPath } from 'ramda';
import { ValidationError } from './errors';

export const normalizePort = (port) => {
  const normalizedPort = Number(port);
  if (Number.isNaN(port)) {
    throw new Error('Bad port for server');
  }
  return normalizedPort;
}

export const readCSV = (string) => {
  const lines = string.split('\n').map(l => l.split(','));
  lines.pop();
  const headers = lines.shift();

  return lines.map(line => {
    return line.reduce(
      (object, cell, i) =>
        Object.assign(object, {
          [headers[i]]: cell,
        }),
      {},
    );
  });
}

export const setTimeoutPromise = (f, ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      f()
        .then(resolve)
        .catch(reject);
    }, ms);
  });
}

export const retryWrapper = (f, { retryInterval, retryCount, name = '' }) => {
  let index = 0;
  return function retryWrapped(...args) {
    if (index > 0) {
      // eslint-disable-next-line no-console
      console.log(`Retry ${name}`);
    }

    return f(...args).catch(err => {
      if (index >= retryCount) {
        throw err;
      }

      return setTimeoutPromise(() => {
        index += 1;
        return retryWrapped(...args);
      }, retryInterval);
    });
  };
}

/*
 * Encapsulate Joi https://github.com/hapijs/joi/blob/v13.0.2/API.md
 */

export const transformJoiError = (joiError) => {
  return joiError.details.reduce(
    (acc, detail) => assocPath(detail.path, detail.message, acc),
    {},
  );
}

export const assertInput = (schema, inputValue) => {
  const { error, value } = schema.validate(inputValue, { abortEarly: false });
  if (error) {
    const errors = transformJoiError(error);
    throw new ValidationError(errors, inputValue);
  }
  return value;
}

