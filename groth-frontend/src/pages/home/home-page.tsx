import styles from './home-page.module.css';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch } from '../../core/store/store';
import { getFavoriteAssets } from '../../core/store/crypto/crypto.actions';
import { useAppSelector } from '../../core/store/auth/auth.selector';
import { Box, Grid, useTheme } from '@mui/material';
import { tokens } from '../../assets/theme';
import { AreaChart } from '../../components/charts/area-chart';

export const Home: React.FC = (): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useAppDispatch();
  const fetchDataRef = useRef(false);
  const favoriteAssets: any[] = useAppSelector(
    (state) => state.crypto.favoriteAssets
  );
  const favoriteAssetId = useMemo(() => ['bitcoin', 'ethereum'], []);
  const filteredArray = favoriteAssets.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name === value.name)
  );

  const fetchData = useCallback(
    (data: string[]) => {
      data.forEach((el: string) => {
        dispatch(getFavoriteAssets(el));
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (fetchDataRef.current) return;
    fetchDataRef.current = true;
    fetchData(favoriteAssetId);
  }, [favoriteAssetId, fetchData]);

  const renderFavoriteBlock = filteredArray.map((element: any) => {
    const currentPrice = element.data.prices[0];
    const currentCap = element.data.market_caps[0];
    return (
      <Grid item lg={6} sm={6} xs={12}>
        <Grid
          container
          sx={{
            backgroundColor: `${
              theme.palette.mode === 'light'
                ? colors.primary.DEFAULT
                : colors.primary[600]
            }`,
            p: '20px 16px',
            minHeight: 185,
            border: `1px solid ${colors.borderColor}`,
            borderRadius: 6,
          }}
        >
          <Grid item xs={12} sm={6} lg={6}>
            <h3 className={styles.assetName}>{element.name}</h3>
            <div className={styles.itemDetails}>
              <h3 className={styles.cardPrice}>{currentPrice[1].toFixed(4)}</h3>
              <p> {currentCap[1].toFixed(0)}</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <AreaChart data={element.data.prices} />
          </Grid>
        </Grid>
      </Grid>
    );
  });

  return (
    <Box sx={{ flexGrow: 1, p: '32px' }}>
      <Grid container spacing={2}>
        {renderFavoriteBlock}
      </Grid>
    </Box>
  );
};
