import { DataTypes } from 'sequelize';

import { sequelize } from '../config/database';
import { GroupModule, Permission } from '../types';

export const Group = sequelize.define<GroupModule>('group', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permission: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    values: [Permission.READ, Permission.WRITE, Permission.DELETE, Permission.SHARE, Permission.UPLOAD_FILES],
    allowNull: false
  }
}, {
  tableName: 'Groups'
});
