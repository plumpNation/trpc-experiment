// import { trpcClient } from './trpcClient';
import { apiSlice, store } from './state/store';

const run = async () => {
  // try {
  //   const user = await trpcClient.userByUsernameOrEmail.query('jackie@example.com');

  //   console.log(user);
  // } catch (err: unknown) {
  //   console.error(err);
  // }

  // try {
  //   const users = await trpcClient.users.query();

  //   console.log(users);
  // } catch (err: unknown) {
  //   console.error(err);
  // }

  // try {
  //   const createdUser = await trpcClient.userCreate.mutate({
  //     username: 'jimbobs',
  //     email: 'jimmy@example.com',
  //     password: '567891234',
  //     passwordConfirm: '567891234',
  //     name: 'Jim Bob McGoo'
  //   });

  //   console.log(createdUser);
  // } catch (err: unknown) {
  //   console.error(err);
  // }

  const { data } =
    await store.dispatch(apiSlice.endpoints.getUsers.initiate());

  console.log(data);
};

run();