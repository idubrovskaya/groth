import React, { useEffect } from 'react';
import { useAppSelector } from '../../core/store/auth/auth.selector';
import { useAppDispatch } from '../../core/store/store';
import { getWatchListElements } from '../../core/store/watchlist/watchlist.actions';
import { getTopPriceData } from '../../core/store/crypto/crypto.actions';
import { AssetsTableComponent } from '../../components/assetsTable/assetsTable';
import { Grid, Typography, useTheme } from '@mui/material';
import { tokens } from '../../assets/theme';

export const WatchListPage: React.FC = (): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const watchlist = useAppSelector((state) => state.watchlist.watchlist);
  const assets = useAppSelector((state) => state.crypto.assets);
  const dispatch = useAppDispatch();

  const filteredArray = assets.filter((element: any) => {
    return watchlist.some((otherElement: any) => {
      return otherElement.assetId === element.id;
    });
  });

  useEffect(() => {
    dispatch(getTopPriceData());
    dispatch(getWatchListElements());
  }, [dispatch]);
  return (
    <Grid sx={{ padding: '10px 20px' }}>
      <Grid sx={{ textAlign: 'center' }}>
        <Typography variant='h2' sx={{ margin: '25px 0 !impoprtant' }}>
          Favorite
        </Typography>
      </Grid>
      <Grid
        sx={{
          padding: '20px 16px',
          marginBottom: '32px',
          minHeight: '180px',
          backgroundColor: `${
            theme.palette.mode === 'light'
              ? colors.primary.DEFAULT
              : colors.primary[600]
          }`,
          border: `1px solid ${colors.borderColor}`,
          borderRadius: '12px',
          '& .MuiPaper-root': {
            backgroundColor: 'transparent !important',
            boxShadow: 'none !important',
            backgroundImage: 'none !important',
          },
        }}
      >
        <AssetsTableComponent assets={filteredArray} />
      </Grid>
    </Grid>
  );
};
