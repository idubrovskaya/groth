import styles from './home-page.module.css';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch } from '../../core/store/store';
import {
  getFavoriteAssets,
  getTopPriceData,
} from '../../core/store/crypto/crypto.actions';
import { useAppSelector } from '../../core/store/auth/auth.selector';
import { Box, Grid, useTheme } from '@mui/material';
import { tokens } from '../../assets/theme';
import { AreaChart } from '../../components/charts/area-chart';

import TrendUp from '../../assets/images/trend-up.svg';
import TrendDown from '../../assets/images/trend-down.svg';
import { LineChart } from '../../components/charts/line-chart';
import { IChartData, ISingleAsset } from '../../core/types/assets';
import { TopPriceComponent } from '../../components/top-price/top-price';

export const Home: React.FC = (): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useAppDispatch();
  const fetchDataRef = useRef(false);
  const favoriteAssets: IChartData[] = useAppSelector(
    (state) => state.crypto.favoriteAssets
  );

  const assetsArray: ISingleAsset[] = useAppSelector(
    (state) => state.crypto.assets
  );
  const favoriteAssetId = useMemo(() => ['bitcoin', 'ethereum'], []);
  const filteredArray = favoriteAssets.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name === value.name)
  );
  const filteredAssetArray = useMemo(() => {
    return assetsArray
      .slice()
      .sort((a, b) => b.current_price - a.current_price);
  }, [assetsArray]);

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
    dispatch(getTopPriceData());
  }, [favoriteAssetId, fetchData, dispatch]);

  const renderFavoriteBlock = filteredArray.map((element: IChartData) => {
    let currentPrice = 0;
    let changedPrice = 0;
    element.singleAsset.forEach((element: ISingleAsset) => {
      currentPrice = element.current_price;
      changedPrice = element.price_change_percentage_24h;
    });

    return (
      <Grid item lg={6} sm={6} xs={12} key={element.name}>
        <Grid
          container
          sx={{
            backgroundColor: `${
              theme.palette.mode === 'light'
                ? colors.primary.DEFAULT
                : colors.primary[600]
            }`,
            padding: '20px 16px',
            minHeight: 185,
            border: `1px solid ${colors.borderColor}`,
            borderRadius: 12,
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
            <AreaChart data={element.price_chart_data} />
          </Grid>
        </Grid>
      </Grid>
    );
  });

  return (
    <Box sx={{ flexGrow: 1, p: '32px' }}>
      <Grid container spacing={2} className={styles.areaChart}>
        {renderFavoriteBlock}
      </Grid>
      <Grid
        container
        sx={{
          backgroundColor: `${
            theme.palette.mode === 'light'
              ? colors.primary.DEFAULT
              : colors.primary[600]
          }`,
          padding: '20px 16px',
          marginBottom: '32px',
          minHeight: 270,
          border: `1px solid ${colors.borderColor}`,
          borderRadius: 12,
        }}
      >
        <Grid item xs={12} sm={12} lg={12}>
          {filteredArray.length && <LineChart data={filteredArray} />}
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          backgroundColor: `${
            theme.palette.mode === 'light'
              ? colors.primary.DEFAULT
              : colors.primary[600]
          }`,
          padding: '20px 16px',
          marginBottom: '32px',
          minHeight: 270,
          border: `1px solid ${colors.borderColor}`,
          borderRadius: 12,
          '& .MuiPaper-root': {
            backgroundColor: 'transparent !important',
            boxShadow: 'none !important',
            backgroundImage: 'none !important',
          },
        }}
      >
        <Grid item xs={12} sm={12} lg={12}>
          {filteredAssetArray.length && (
            <TopPriceComponent assets={filteredAssetArray.slice(0, 6)} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
