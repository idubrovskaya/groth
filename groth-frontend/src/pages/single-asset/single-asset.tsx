import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../core/store/auth/auth.selector';
import { useAppDispatch } from '../../core/store/store';

import { ISingleAsset } from '../../core/types/assets';
import {
  Alert,
  AlertColor,
  Avatar,
  Box,
  Button,
  Grid,
  Snackbar,
  Typography,
  useTheme,
} from '@mui/material';

import { tokens } from '../../assets/theme';
import styles from './single-asset.module.css';

import { createWatchListRecord } from '../../core/store/crypto/crypto.actions';

export const SingleAssetPage: React.FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [error, setError] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const assetsArray: ISingleAsset[] = useAppSelector(
    (state) => state.crypto.assets
  );

  const asset = assetsArray.find(
    (element: ISingleAsset) => element.name === (id as string)
  );

  const handleCreateRecord = () => {
    try {
      const data = {
        name: '',
        assetId: '',
      };
      if (asset) {
        data.name = asset.name;
        data.assetId = asset.id;
      }

      dispatch(createWatchListRecord(data));
      setError(false);
      setSeverity('success');
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } catch (error) {
      setError(true);
      setSeverity('error');
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  };

  return (
    <>
      {asset && (
        <Grid
          container
          spacing={2}
          sx={{
            padding: 5,
            alignItems: 'center',
            margin: '50px 0',
            width: '100%',
          }}
        >
          <Grid item xs={12} display='flex' justifyContent={'center'}>
            <Typography variant='h1'>{asset.name}</Typography>
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 16px',
                width: '100%',
                maxWidth: 500,
                minHeight: 185,
                marginBottom: '25px',
                borderRadius: 12,
                border: `1px solid ${colors.borderColor}`,
                backgroundColor: `${
                  theme.palette.mode === 'light'
                    ? colors.primary.DEFAULT
                    : colors.primary[600]
                }`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={asset.image} sx={{ mr: 2 }} />
                <Typography variant='h2' sx={{ fontSize: 20, fontWeight: 600 }}>
                  {asset.name}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 16px',
                width: '100%',
                maxWidth: 500,
                minHeight: 185,
                marginBottom: '25px',
                borderRadius: 12,
                border: `1px solid ${colors.borderColor}`,
                backgroundColor: `${
                  theme.palette.mode === 'light'
                    ? colors.primary.DEFAULT
                    : colors.primary[600]
                }`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant='h2'
                  sx={{ fontSize: 20, fontWeight: 600, marginRight: 2 }}
                >
                  Current price:
                </Typography>
                <Typography variant='h2' sx={{ fontSize: 20 }}>
                  $ {asset.current_price}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 16px',
                width: '100%',
                maxWidth: 500,
                minHeight: 185,
                marginBottom: '25px',
                borderRadius: 12,
                border: `1px solid ${colors.borderColor}`,
                backgroundColor: `${
                  theme.palette.mode === 'light'
                    ? colors.primary.DEFAULT
                    : colors.primary[600]
                }`,
              }}
            >
              <Typography
                variant='h2'
                sx={{ fontSize: 20, fontWeight: 600, marginRight: 2 }}
              >
                Price change:&nbsp;
              </Typography>
              <Typography
                variant='h2'
                sx={{ fontSize: 20 }}
                className={
                  asset.price_change_24h >= 0
                    ? `${styles.trendUp}`
                    : ` ${styles.trendDown}`
                }
              >
                $ {asset.price_change_24h.toFixed(4)}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 16px',
                width: '100%',
                maxWidth: 500,
                minHeight: 185,
                marginBottom: '25px',
                borderRadius: 12,
                border: `1px solid ${colors.borderColor}`,
                backgroundColor: `${
                  theme.palette.mode === 'light'
                    ? colors.primary.DEFAULT
                    : colors.primary[600]
                }`,
              }}
            >
              <Typography
                variant='h2'
                sx={{ fontSize: 20, fontWeight: 600, marginRight: 2 }}
              >
                Price change (%):&nbsp;
              </Typography>
              <Typography
                variant='h2'
                sx={{ fontSize: 20 }}
                className={
                  asset.price_change_percentage_24h >= 0
                    ? `${styles.trendUp}`
                    : ` ${styles.trendDown}`
                }
              >
                $ {asset.price_change_percentage_24h.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ justifyContent: 'center', marginTop: '25px' }}>
            <Button
              color='success'
              variant='outlined'
              onClick={() => navigate(-1)}
              sx={{
                '&:first-child': {
                  marginRight: 20,
                },
              }}
            >
              Back
            </Button>
            <Button
              color='success'
              variant='outlined'
              sx={{
                '&:first-child': {
                  marginRight: '20px',
                },
              }}
              onClick={handleCreateRecord}
            >
              Add to favorite
            </Button>
          </Grid>
          <Snackbar open={open} autoHideDuration={6000}>
            <Alert severity={severity} variant='filled' sx={{ width: '100%' }}>
              {!error
                ? ' Currency added to favorite!'
                : 'Oops, something went wrong!'}
            </Alert>
          </Snackbar>
        </Grid>
      )}
    </>
  );
};
