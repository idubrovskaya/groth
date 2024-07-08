import { Typography, Box, TextField } from '@mui/material';
import React from 'react';
import { IPropsSignUp } from '../../core/types/auth';
import { AppLoadingButton } from '../ui/loading-button';

export const SignUpPage: React.FC<IPropsSignUp> = (
  props: IPropsSignUp
): JSX.Element => {
  const { register, navigate, errors, loading } = props;
  return (
    <>
      <Typography
        component='h1'
        variant='h5'
        textAlign={'center'}
        fontFamily={'Poppins'}
        padding={2}
      >
        Sign up
      </Typography>

      <Typography
        variant='body1'
        fontFamily={'Poppins'}
        textAlign={'center'}
        marginBottom={3}
      >
        Enter your data
      </Typography>
      <Box>
        <TextField
          margin='normal'
          fullWidth
          // required
          autoFocus
          label='Name'
          variant='outlined'
          placeholder='Enter your name'
          helperText={errors.name ? `${errors.name.message}` : ''}
          error={!!errors.name}
          {...register('name')}
        />
        <TextField
          margin='normal'
          fullWidth
          // required
          autoFocus
          label='Username'
          variant='outlined'
          placeholder='Enter your username'
          helperText={errors.username ? `${errors.username.message}` : ''}
          error={!!errors.username}
          {...register('username')}
        />
        <TextField
          margin='normal'
          fullWidth
          // required
          autoFocus
          label='Email'
          variant='outlined'
          placeholder='Enter your email'
          helperText={errors.email ? `${errors.email.message}` : ''}
          error={!!errors.email}
          {...register('email')}
        />
        <TextField
          margin='normal'
          // required
          fullWidth
          type='password'
          label='Password'
          variant='outlined'
          placeholder='Enter your password'
          helperText={errors.password ? `${errors.password.message}` : ''}
          error={!!errors.password}
          {...register('password')}
        />
        <TextField
          margin='normal'
          // required
          fullWidth
          type='password'
          label='Password'
          variant='outlined'
          placeholder='Confirm your password'
          helperText={
            errors.confirmPassword ? `${errors.confirmPassword.message}` : ''
          }
          error={!!errors.password}
          {...register('confirmPassword')}
        />
      </Box>
      <AppLoadingButton loading={loading} variant='contained' type='submit'>
        Sign up
      </AppLoadingButton>

      <Typography variant='body1' sx={{ fontFamily: 'Poppins' }}>
        Do you have an account?
        <span
          onClick={() => navigate('/sign-in')}
          style={{ color: '#1900D5', marginLeft: '10px', cursor: 'pointer' }}
        >
          Sign in
        </span>
      </Typography>
    </>
  );
};
