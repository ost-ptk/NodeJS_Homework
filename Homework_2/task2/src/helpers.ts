import { NewUserRequestBody, UpdateUserRequestBody, User, users } from './users';
import { v4 as uuidv4 } from 'uuid';

export const createUser = (newUser: NewUserRequestBody): User => {
  const user = {
    ...newUser,
    id: uuidv4(),
    isDeleted: false
  };

  users.push(user);

  return user;
}

export const findUser = (id: string): User | undefined => users.find(user => user.id === id);

export const deleteUser = (user: User): void => {
  user.isDeleted = true
};

export const updateUser = (id: string, data: UpdateUserRequestBody): User | undefined => {
  for(let i = 0; users.length > i; i++) {
    if(users[i].id === id) {
      users[i] = { ... users[i], ...data }
    }
  }

  return findUser(id)
}

export const getAutoSuggestUsers = (loginSubstring: string, limit: string): User[] => (
  users
    .filter((user) => user.login.includes(loginSubstring) && !user.isDeleted)
    .sort((a, b) => a.login.localeCompare(b.login))
    .slice(0, Number(limit))
)

