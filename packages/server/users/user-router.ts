import zod from 'zod';
import { signUpSchema } from '../common/validation/auth';

import { publicProcedure } from '../trpc';
import { SignupUser, findUserById, findUsers, createUser } from './user-model';

export const userById =
  publicProcedure
    .input(zod.string())
    .query(({ input }) => {
      return findUserById(input)
    });

export const userByEmail =
  publicProcedure
    .input(zod.string().email())
    .query(({ input }) => findUserById(input));

export const userCreate =
  publicProcedure
    .input(signUpSchema)
    .mutation(({ input }: { input: SignupUser }) => createUser(input));

export const users = publicProcedure.query(() => findUsers())