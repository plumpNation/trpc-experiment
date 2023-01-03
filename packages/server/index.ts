import { createHTTPServer } from '@trpc/server/adapters/standalone';

import { router } from './trpc';
import { userById } from './users/UserModel';

const appRouter = router({
  userById,
  // userCreate,
});

export type AppRouter = typeof appRouter;

// Why is this not in the quickstart tutorial?
createHTTPServer({
  router: appRouter,
  createContext() {
    return {};
  },
}).listen(2022);

console.log('running')