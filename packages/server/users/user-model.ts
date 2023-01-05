import { db } from '../database'

import type { LoginSchema, SignupSchema } from '../auth/auth-validators'

const users = db.collection('users')

export interface User extends LoginSchema {
  id: string
  created: Date
  updated: Date
}

export const findUsers = () => users.getFullList<User[]>()

export const findUserById = async (id: string): Promise<User | undefined> =>
  (await users.getList<User>(1, 1, { filter: `id = '${id}'` })).items[0]

export const findUserByUsername = async (
  username: string,
): Promise<User | undefined> =>
  (await users.getList<User>(1, 1, { filter: `username = '${username}'` }))
    .items[0]

export const findUserByEmail = async (
  email: string,
): Promise<User | undefined> =>
  (await users.getList<User>(1, 1, { filter: `email = '${email}'` })).items[0]

export const findUserByUsernameOrEmail = async (
  username: string,
): Promise<User | undefined> =>
  (
    await users.getList<User>(1, 1, {
      filter: `username = '${username}' || email = '${username}'`,
    })
  ).items[0]

export const createUser = (user: SignupSchema) => users.create<User>(user)

export const deleteUser = async (id: string) => {
  try {
    findUserById(id)
  } catch (err) {
    return true
  }

  return users.delete(id)
}
