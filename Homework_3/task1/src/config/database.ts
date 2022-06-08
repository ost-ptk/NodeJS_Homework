import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres://localhost:5432/mydb');

sequelize.authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  });
