import { createSlice } from '@reduxjs/toolkit';
import { getWatchListElements } from './watchlist.actions';

const initialState: any = {
  watchlist: [],
};

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWatchListElements.fulfilled, (state, action) => {
      state.watchlist = action.payload;
    });
  },
});

export default watchlistSlice.reducer;
