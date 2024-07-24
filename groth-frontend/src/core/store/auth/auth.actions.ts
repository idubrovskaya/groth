import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISignInData, ISignUpData } from '../../types/auth';
import { instance } from '../../api';

export const signIn = createAsyncThunk(
  'POST/sign-in',
  async (data: ISignInData, { rejectWithValue }) => {
    try {
      const user = await instance.post('auth/sign-in', data);
      localStorage.setItem('accessToken', user.data.token);
      localStorage.setItem('firstName', user.data.user.firstName);
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
      localStorage.setItem('accessToken', newUser.data.token);
      localStorage.setItem('firstName', newUser.data.firstName);

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

export const getPublicUser = createAsyncThunk(
  'GET/get-public-user-data',
  async (_, { rejectWithValue }) => {
    try {
      const user = await instance.get('auth/get-public-user-data');
      localStorage.setItem('firstName', user.data.firstName);

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

export const updatePublicUser = createAsyncThunk(
  'PATCH/update-user-data',
  async (data: any, { rejectWithValue }) => {
    try {
      const user = await instance.patch('users', data);
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

export const deleteUser = createAsyncThunk(
  'DELETE/users',
  async (_, { rejectWithValue }) => {
    try {
      return instance.delete('users');
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const changePassword = createAsyncThunk(
  'PATCH/change-password',
  async (
    data: { oldPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      return instance.patch('users/change-password', data);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
