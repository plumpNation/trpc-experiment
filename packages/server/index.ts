import express from 'express'
import Router from 'express-promise-router'

import { router, createExpressMiddleware, createContext } from './trpc'
import {
  userById,
  userCreate,
  users,
  userByUsernameOrEmail,
} from './users/user-router'
import { login } from './auth/auth-router'

const expressApp = express()
const expressRouter = Router()

expressApp.use(expressRouter)

const trpcRouter = router({
  login,
  userById,
  users,
  userCreate,
  userByUsernameOrEmail,
})

export type AppRouter = typeof trpcRouter

expressRouter.use(
  '/trpc',
  createExpressMiddleware({
    router: trpcRouter,
    createContext,
  }),
)

const port = 3000

expressApp.listen(port, () => {
  console.info(`Express app listening on port ${port}`)
})
