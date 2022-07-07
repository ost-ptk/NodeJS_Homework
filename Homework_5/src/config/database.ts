import { Sequelize } from 'sequelize';

import { config } from './environment';
import { genericErrorLogger, genericLogger } from '../api';

export const sequelize = new Sequelize(config.dbUrl);

sequelize.authenticate()
  .then(() => {
    genericLogger.info('Connection has been established successfully.');
  })
  .catch((error) => {
    genericErrorLogger.error('Unable to connect to the database:', error);
  });

sequelize.sync({ alter: true }).catch((error: string) => {
  genericErrorLogger.error(error);
  throw new Error(error);
});
