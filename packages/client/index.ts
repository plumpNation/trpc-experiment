import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '../server';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:2022',
    }),
  ],
});

const run = async () => {
  const user = await client.userById.query(1);

  console.log(user);

  // const createdUser = await trpc.userCreate.mutate({ name: 'sachinraja' });

  // console.log(createdUser);
};

run();