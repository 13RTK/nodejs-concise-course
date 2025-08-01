import pino from 'pino';

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

const logger = pino(transport);

export default logger;
