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
  .query(async ({ input }) => {
    const user = await findUserById(input)

    if (user) {
      return user
    }

    throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found by id' })
  })

/**
 * Provide either a username or email, and if it matches an
 * existing user with that username or email, that user will be returned.
 */
export const userByUsernameOrEmail = publicProcedure
  .input(zod.string().email())
  .query(async ({ input }) => {
    const user = await findUserByUsernameOrEmail(input)

    if (user) {
      return user
    }

    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User not found by username or email',
    })
  })

export const userCreate = publicProcedure
  .input(signUpSchema)
  .mutation(async ({ input }) => {
    const [userWithEmail, userWithUsername] = await Promise.all([
      findUserByEmail(input.email),
      findUserByUsername(input.username),
    ])

    if (userWithEmail) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Email already taken',
      })
    }

    if (userWithUsername) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Username already taken',
      })
    }

    return createUser(input)
  })

export const users = publicProcedure.query(() => findUsers())
