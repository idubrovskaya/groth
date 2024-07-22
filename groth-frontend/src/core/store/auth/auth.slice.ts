import { createSlice } from '@reduxjs/toolkit';
import { IAuthState, IPublicUser } from '../../types/auth';
import { getPublicUser, signIn, signUp } from './auth.actions';

const initialState: IAuthState = {
  user: {
    token: '',
    user: {} as IPublicUser,
  },
  isLogged: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLogged = false;
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLogged = true;
      })

      .addCase(signIn.rejected, (state) => {
        state.isLogged = false;
        state.isLoading = false;
      })
      .addCase(signUp.pending, (state) => {
        state.isLogged = false;
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLogged = true;
      })
      .addCase(signUp.rejected, (state) => {
        state.isLogged = false;
        state.isLoading = false;
      })
      .addCase(getPublicUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      });
  },
});

export default authSlice.reducer;
