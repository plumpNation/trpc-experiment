import { db } from '../database'
import { publicProcedure } from '../trpc'
import { loginSchema } from './auth-validators'

export const login = publicProcedure
  .input(loginSchema)
  .query(async ({ input: { username, password } }) =>
    db.collection('users').authWithPassword(username, password),
  )
