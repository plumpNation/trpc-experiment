import { createApi } from '@reduxjs/toolkit/query'
import { configureStore } from '@reduxjs/toolkit';

import { trpcClient } from '../trpcClient';
import { usersReducer } from './usersSlice';

import type { User } from '../../server/users/user-model';

/**
 * Here we can set up rather a lot of our API to keep it all in one place.
 * In this case, we're using trpcClient to make our API calls, so it's
 * a bit of a silly example.
 */
export const apiSlice = createApi({
  reducerPath: 'api',

  tagTypes: ['Users', 'User'],

  baseQuery: (trpcResult: Promise<unknown>) =>
    trpcResult
      .then(data => ({ data }))
      .catch(error => ({ error })),

  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: trpcClient.users.query,
      providesTags: (result, error) => [{ type: 'Users' }],
    }),
    getUser: builder.query<User, string>({
      query: (userId: string) => trpcClient.userById.query(userId),
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
  }),
})


export const store = configureStore({
  reducer: {
    users: usersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  devTools: process.env.NODE_ENV !== 'production',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch