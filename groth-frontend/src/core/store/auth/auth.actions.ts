import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISignInData, ISignUpData } from '../../types/auth';
import { instance } from '../../api';

export const signIn = createAsyncThunk(
  'POST/sign-in',
  async (data: ISignInData, { rejectWithValue }) => {
    try {
      const user = await instance.post('auth/sign-in', data);
      return user.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const signUp = createAsyncThunk(
  'POST/sign-up',
  async (data: ISignUpData, { rejectWithValue }) => {
    try {
      const newUser = await instance.post('auth/sign-up', data);

      return newUser.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
