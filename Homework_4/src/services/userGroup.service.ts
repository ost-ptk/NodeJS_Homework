import { sequelize } from '../config/database';

import { getGroupById } from './group.service';
import { findUserById } from './user.service';

export const addUsersToGroup = async (groupId: string, userId: string): Promise<boolean | string> => {
  return await sequelize.transaction(async (t) => {
    const group = await getGroupById(groupId, t);
    const user = await findUserById(userId, t);

    if (!group || !user) {
      return 'User or group not found';
    }

    const isAlreadyAdded = await user?.hasGroup(group, { transaction: t });

    if (isAlreadyAdded) {
      return 'User already added';
    }
    await user?.addGroup(group, { transaction: t });

    return true;
  });
};
