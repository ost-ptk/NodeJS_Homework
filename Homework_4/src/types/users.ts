import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface NewUserRequestBody {
  login: string;
  password: string;
  age: number;
}

export interface UserModel extends NewUserRequestBody, Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: string;
  isDeleted: boolean;
}

export interface UpdateUserRequestBody {
  login?: string;
  password?: string;
  age?: number;
}
