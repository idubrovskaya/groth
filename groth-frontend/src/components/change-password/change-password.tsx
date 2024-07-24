import { Box, Grid, TextField, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { tokens } from '../../assets/theme';
import { AppButton } from '../ui/button';
import { useAppDispatch } from '../../core/store/store';
import { changePassword } from '../../core/store/auth/auth.actions';

export const ChangePasswordComponent: React.FC = (): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const dispatch = useAppDispatch();

  const handleChangePassword = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const data = {
      oldPassword,
      newPassword,
    };
    dispatch(changePassword(data));
  };

  return (
    <Grid
      component='form'
      noValidate
      autoComplete='off'
      onSubmit={handleChangePassword}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: colors.blue,
          },
        },
        '& label.Mui-focused': {
          color: `${
            theme.palette.mode === 'dark'
              ? colors.white.DEFAULT
              : colors.black.DEFAULT
          }`,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '32px 0',
        }}
      >
        <TextField
          label='Old password'
          variant='outlined'
          type='password'
          sx={{ width: '35%', marginBottom: '15px !important' }}
          value={oldPassword}
          onChange={(event) => setOldPassword(event.target.value)}
        />
        <TextField
          label='New password'
          variant='outlined'
          type='password'
          sx={{ width: '35%', marginBottom: '15px !important' }}
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <Box sx={{ marginTop: '32px' }}>
          <AppButton type='submit'>Change password</AppButton>
        </Box>
      </Box>
    </Grid>
  );
};
