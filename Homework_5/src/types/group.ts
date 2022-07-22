import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE =  'DELETE',
  SHARE = 'SHARE',
  UPLOAD_FILES = 'UPLOAD_FILES'
}

export type PermissionString = keyof typeof Permission;

export interface GroupModule extends NewGroupRequestBody, Model<InferAttributes<GroupModule>, InferCreationAttributes<GroupModule>>{
  id: string,
}

export interface NewGroupRequestBody {
  name: string,
  permission: PermissionString[]
}
