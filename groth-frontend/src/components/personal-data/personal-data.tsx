import { Box, Grid, TextField, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { tokens } from '../../assets/theme';
import { AppButton } from '../ui/button';
import { useAppSelector } from '../../core/store/auth/auth.selector';
import { useAppDispatch } from '../../core/store/store';
import {
  getPublicUser,
  updatePublicUser,
} from '../../core/store/auth/auth.actions';

export const PersonalDataComponent: React.FC = (): JSX.Element => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [firstName, setFirstName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const { user } = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setUserName(user.userName);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      firstName: firstName,
      userName: userName,
      email: email,
    };
    dispatch(updatePublicUser(data));
    dispatch(getPublicUser());
  };

  return (
    <Grid
      component='form'
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}
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
          label='Name'
          variant='outlined'
          type='text'
          sx={{ width: '25%', marginBottom: '15px !important' }}
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />

        <TextField
          label='Username'
          variant='outlined'
          type='text'
          sx={{ width: '25%', marginBottom: '15px !important' }}
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />

        <TextField
          label='Email'
          variant='outlined'
          type='text'
          sx={{ width: '25%', marginBottom: '15px !important' }}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Box sx={{ marginTop: '32px' }}>
          <AppButton type='submit'>Save</AppButton>
        </Box>
      </Box>
    </Grid>
  );
};
