import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../api';

export const getWatchListElements = createAsyncThunk(
  'watchlist/get-elements',
  async (_, { rejectWithValue }) => {
    try {
      const userAssets = await instance.get('watchlist/get-elements');
      return userAssets.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
