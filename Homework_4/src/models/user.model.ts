import { DataTypes } from 'sequelize';

import { sequelize } from '../config/database';
import { UserModel } from '../types';

export const User = sequelize.define<UserModel>('user', {
  login: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'Users',
  paranoid: true,
  deletedAt: 'destroyTime'
});
