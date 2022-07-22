import { v4 as uuidv4 } from 'uuid';
import { Op, Transaction } from 'sequelize';

import { Group } from '../models';
import { GroupModule, NewGroupRequestBody } from '../types';

export const getGroupById = async (id: string, t?: Transaction): Promise<GroupModule | null> => await Group.findByPk(id, { transaction: t });

export const getAllGroup = async (): Promise<GroupModule[]> => await Group.findAll();

export const createGroup = async (newGroup: NewGroupRequestBody): Promise<GroupModule> => (await Group.create({ ...newGroup, id: uuidv4() }));

export const updateGroupById = async (id: string, data: Partial<NewGroupRequestBody>): Promise<GroupModule | null> => {
  const isUpdated = await Group.update({ ...data }, { where: { id: { [Op.eq]: id } } });

  return isUpdated[0] ? await getGroupById(id) : null;
};

export const deleteGroupById = async (id: string): Promise<boolean> => (
  await Group.destroy({ where: { id: { [Op.eq]: id } } }).then(result => Boolean(result))
);
