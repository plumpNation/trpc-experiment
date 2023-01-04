import express, { NextFunction, Request, Response } from 'express'
import Router from 'express-promise-router'
import { handleErrorWithStatus } from './common/trpc-errors'
import { hasStatusCode } from './database/db-helper'

import { router, createExpressMiddleware, createContext } from './trpc'
import {
  userById,
  userCreate,
  userByUsernameOrEmail,
} from './users/user-router'
import { login } from './auth/auth-router'

const expressApp = express()
const expressRouter = Router()

expressApp.use(expressRouter)

const trpcRouter = router({
  login,
  userById,
  userCreate,
  userByUsernameOrEmail,
})

export type AppRouter = typeof trpcRouter

expressRouter.use(
  '/trpc',
  createExpressMiddleware({
    router: trpcRouter,
    createContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError({ error, type, path, input, ctx, req }) {
      if (hasStatusCode(error.cause)) {
        handleErrorWithStatus(error.cause)

        return
      }

      if (error.code === 'INTERNAL_SERVER_ERROR') {
        // send to bug reporting
        // todo log, and remove stack trace.
        throw error
      }
    },
  }),
)

expressRouter.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
  },
)

const port = 3000

expressApp.listen(port, () => {
  console.info(`Express app listening on port ${port}`)
})
