import pino from 'pino';
import pinoHttp from 'pino-http';

const transport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      level: 'info',
      options: {
        destination: './src/logs/all-logs.log',
        mkdir: true,
      },
    },
    {
      target: 'pino/file',
      level: 'error',
      options: {
        destination: './src/logs/errors.log',
        mkdir: true,
      },
    },
    {
      target: 'pino-pretty',
      level: 'info',
      options: {
        colorize: true,
      },
    },
  ],
});

export const logger = pino(transport);

export const pinoHttpMiddleware = pinoHttp({
  logger,
  // Execute before the body data parsed
  serializers: {
    res(res) {
      res.body = res.raw.body;
      return res;
    },
  },

  customLogLevel: function (_req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500 || err) {
      return 'error';
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'silent';
    }
    return 'info';
  },
});
