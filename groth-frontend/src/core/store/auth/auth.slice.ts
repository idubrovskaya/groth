import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from '../../types/auth';
import { signIn, signUp } from './auth.actions';

const initialState: IAuthState = {
  user: {
    id: null,
    firstName: '',
    username: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    watchList: [
      {
        id: null,
        name: '',
        assetId: '',
        createdAt: '',
        updatedAt: '',
        user: null,
      },
    ],
  },
  isLogged: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLogged = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLogged = true;
      });
  },
});

export default authSlice.reducer;
