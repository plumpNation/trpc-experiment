import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '../server';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

const run = async () => {
  try {
    const user = await client.userById.query('dnf5gq8o3y0m8tj');
  } catch (err) {
    debugger;
  }

  // console.log(user);

  // const createdUser = await client.userCreate.mutate({ name: 'sachinraja' });

  // console.log(createdUser);
};

run();