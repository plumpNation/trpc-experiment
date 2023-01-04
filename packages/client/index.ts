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
    const user = await client.userByUsernameOrEmail.query('jackie@example.com');

    console.log(user);
  } catch (err: unknown) {
    console.error(err);
  }

  try {
    const createdUser = await client.userCreate.mutate({
      username: 'jimbob',
      email: 'jimmy@example.com',
      password: '567891234',
      passwordConfirm: '567891234',
      name: 'Jim Bob McGoo'
    });

    console.log(createdUser);
  } catch (err: unknown) {
    console.error(err);
  }
};

run();