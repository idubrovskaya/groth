import styles from './home-page.module.css';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch } from '../../core/store/store';
import { getFavoriteAssets } from '../../core/store/crypto/crypto.actions';
import { useAppSelector } from '../../core/store/auth/auth.selector';
import { Box, Grid, useTheme } from '@mui/material';
import { tokens } from '../../assets/theme';
import { AreaChart } from '../../components/charts/area-chart';

import TrendUp from '../../assets/images/trend-up.svg';
import TrendDown from '../../assets/images/trend-down.svg';

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
    const currentPrice = element.singleAsset.map(
      (element: any) => element.current_price
    );
    const currentCap = element.singleAsset.map(
      (element: any) => element.market_cap
    );
    const changedPrice = element.singleAsset.map(
      (element: any) => element.price_change_percentage_24h
    );
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
              <h3 className={styles.cardPrice}>${currentPrice}</h3>
              <Box
                className={
                  changedPrice > 0
                    ? `${styles.priceTrend} ${styles.trendUp}`
                    : `${styles.priceTrend} ${styles.trendDown}`
                }
              >
                {changedPrice > 0 ? (
                  <img src={TrendUp} alt='trend-up' />
                ) : (
                  <img src={TrendDown} alt='trend-down' />
                )}
                <span>{Number(changedPrice).toFixed(2)}%</span>
              </Box>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <AreaChart data={element.data} />
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
