import { createSlice } from '@reduxjs/toolkit'

import type { User } from '../../server/users/user-model'

export interface UsersState {
  value: User[]
}

const initialState: UsersState = {
  value: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    gotAllUsers: (state) => state,
  },
})

export const { gotAllUsers } = usersSlice.actions

export const usersReducer = usersSlice.reducer