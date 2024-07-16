import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from './auth/auth.slice';
import cryptoSlice from './crypto/crypto.slice';
import watchlistSlice from './watchlist/watchlist.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    crypto: cryptoSlice,
    watchlist: watchlistSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): any => useDispatch<AppDispatch>();
