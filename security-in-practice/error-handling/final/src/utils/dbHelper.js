import { Sequelize } from 'sequelize';
import { logger } from './loggerHelper.js';

const databaseConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
};

// console.log(databaseConfig);

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    dialect: 'postgres',
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  logger.error(`Unable to connect to the database: ${error}`);
  throw error;
}

export default sequelize;
