import zod from 'zod'

import { signUpSchema } from '../auth/auth-validators'
import { publicProcedure, TRPCError } from '../trpc'

import {
  findUserById,
  findUsers,
  createUser,
  findUserByUsernameOrEmail,
  findUserByEmail,
  findUserByUsername,
} from './user-model'

export const userById = publicProcedure
  .input(zod.string())
  .query(async ({ input }) => findUserById(input))

export const userByUsernameOrEmail = publicProcedure
  .input(zod.string().email())
  .query(({ input }) => findUserByUsernameOrEmail(input))

export const userCreate = publicProcedure
  .input(signUpSchema)
  .mutation(async ({ input }) => {
    const [userWithEmail, userWithUsername] = await Promise.all([
      findUserByEmail(input.email),
      findUserByUsername(input.username),
    ])

    if (userWithEmail || userWithUsername) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Username or email already taken',
      })
    }

    return createUser(input)
  })

export const users = publicProcedure.query(() => findUsers())
