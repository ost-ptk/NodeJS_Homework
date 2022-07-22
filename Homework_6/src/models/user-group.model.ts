import { sequelize } from '../config/database';
import { UserGroupModel } from '../types/user-group';

import { User } from './user.model';
import { Group } from './group.model';
import { DataTypes } from 'sequelize';

export const UserGroup = sequelize.define<UserGroupModel>('UserGroup', {
  groupId: DataTypes.UUIDV4,
  userId: DataTypes.UUIDV4
});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });
