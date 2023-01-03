import { publicProcedure } from '../trpc';

export interface User {
  id: number;
  name: string;
}

const userList: User[] = [
  {
    id: 1,
    name: 'KATT',
  },
];

export const userById =
  publicProcedure
    .input((val: unknown) => {
      if (Number.isFinite(val)) {
        return val;
      }

      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const { input } = req;

      return userList.find((u) => u.id === input);
    });