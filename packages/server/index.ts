import express from 'express';

import { router, createExpressMiddleware, createContext } from './trpc';
import { userById, userCreate } from './users/user-router';

const app = express();

const appRouter = router({
  userById,
  userCreate,
});

export type AppRouter = typeof appRouter;

app.use('/trpc', createExpressMiddleware({
  router: appRouter,
  createContext,
}));

const port = 3000;

app.listen(port, () => {
  console.info(`Example app listening on port ${port}`)
});