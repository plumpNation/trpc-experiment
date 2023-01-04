// import { db } from '../database'
import { publicProcedure, TRPCError } from '../trpc'
import { loginSchema } from './auth-validators'

export const login = publicProcedure
  .input(loginSchema)
  .query(async ({ input: { username, password } }) => {
    throw new TRPCError({
      code: 'METHOD_NOT_SUPPORTED',
      cause: { username, password },
    })
  })
