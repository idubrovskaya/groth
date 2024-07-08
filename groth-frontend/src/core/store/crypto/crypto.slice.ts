import { createSlice } from '@reduxjs/toolkit';
import { getFavoriteAssets } from './crypto.actions';

const initialState: any = {
  assets: [],
  favoriteAssets: [],
};

export const cryptoSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavoriteAssets.fulfilled, (state, action) => {
      state.favoriteAssets.push(action.payload);
    });
  },
});

export default cryptoSlice.reducer;
