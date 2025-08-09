import { Sequelize } from 'sequelize';
import { logger } from './loggerHelper.js';

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: 'postgres',
    port: dbConfig.port,
    logging: (...msg) => logger.info(msg),
  }
);

try {
  await sequelize.authenticate();
  logger.info('Connection has been established successfully.');
} catch (error) {
  logger.error('Unable to connect to the database:', error);
}

export default sequelize;
