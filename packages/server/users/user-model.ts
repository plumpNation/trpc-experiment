import { db } from '../db';

const users = db.collection('users');

export interface SignupUser {
  name: string;
  username: string;
  email: string;
}

export interface User extends SignupUser {
  id: string;
  created: Date;
  updated: Date;
}

export const findUsers = () => users.getFullList<User[]>();
export const findUserById = (id: string) => users.getOne<User>(id);
export const findUserByUsername = (username: string) => users.getFirstListItem<User>(`username = ${username}`);
export const createUser = (user: SignupUser) => users.create<User>(user);
export const deleteUser = (id: string) => users.delete(id);