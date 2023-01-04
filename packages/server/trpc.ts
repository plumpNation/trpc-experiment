import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

export { TRPCError } from '@trpc/server'

export const createContext = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  res,
}: trpcExpress.CreateExpressContextOptions) => ({})

export type Context = inferAsyncReturnType<typeof createContext>

export const trpc = initTRPC.context<Context>().create()

export const publicProcedure = trpc.procedure
export const router = trpc.router
export const createExpressMiddleware = trpcExpress.createExpressMiddleware

export type TRPC = typeof trpc
