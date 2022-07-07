import { InferAttributes, InferCreationAttributes, Model, BelongsToManyAddAssociationMixin, BelongsToManyHasAssociationMixin } from 'sequelize';

import { GroupModule } from './group';

export interface NewUserRequestBody {
  login: string;
  password: string;
  age: number;
}

export interface UserModel extends
  NewUserRequestBody,
  Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>,
  BelongsToManyAddAssociationMixin<GroupModule, null>,
  BelongsToManyHasAssociationMixin<GroupModule, null>
{
  id: string;
  isDeleted: boolean;
  addGroup: BelongsToManyAddAssociationMixin<GroupModule, null>,
  hasGroup: BelongsToManyHasAssociationMixin<GroupModule, null>
}

export interface UpdateUserRequestBody {
  login?: string;
  password?: string;
  age?: number;
}
