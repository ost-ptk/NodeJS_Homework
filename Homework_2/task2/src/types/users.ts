export interface NewUserRequestBody {
  login: string;
  password: string;
  age: number;
}

export interface User extends NewUserRequestBody {
  id: string;
  isDeleted: boolean;
}

export interface UpdateUserRequestBody {
  login?: string;
  password?: string;
  age?: number;
}
