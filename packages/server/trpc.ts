import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({});

export const trpc = initTRPC.context<Context>().create();

export const publicProcedure = trpc.procedure;
export const router = trpc.router;
export const createExpressMiddleware = trpcExpress.createExpressMiddleware;

export type Context = inferAsyncReturnType<typeof createContext>;
export type TRPC = typeof trpc;