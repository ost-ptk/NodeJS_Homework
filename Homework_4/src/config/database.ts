import { Sequelize } from 'sequelize';

import { config } from './environment';

export const sequelize = new Sequelize(config.dbUrl);

sequelize.authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  });
