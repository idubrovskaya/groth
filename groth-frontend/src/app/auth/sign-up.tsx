import { Typography, Box, TextField, Button } from '@mui/material';
import React from 'react';
import { IPropsSignUp } from '../../common/types/auth';

export const SignUpPage: React.FC<IPropsSignUp> = (
  props: IPropsSignUp
): JSX.Element => {
  const {
    setEmail,
    setPassword,
    setRepeatPassword,
    setFirstName,
    setUserName,
    navigate,
  } = props;
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
          required
          autoFocus
          label='Name'
          variant='outlined'
          placeholder='Enter your name'
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          margin='normal'
          fullWidth
          required
          autoFocus
          label='Username'
          variant='outlined'
          placeholder='Enter your username'
          onChange={(event) => setUserName(event.target.value)}
        />
        <TextField
          margin='normal'
          fullWidth
          required
          autoFocus
          label='Email'
          variant='outlined'
          placeholder='Enter your email'
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          type='password'
          label='Password'
          variant='outlined'
          placeholder='Enter your password'
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          type='password'
          label='Password'
          variant='outlined'
          placeholder='Confirm your password'
          onChange={(event) => setRepeatPassword(event.target.value)}
        />
      </Box>
      <Button
        sx={{ fontFamily: 'Poppins', m: 2, width: '60%' }}
        variant='contained'
        type='submit'
      >
        Sign up
      </Button>

      <Typography variant='body1' sx={{ fontFamily: 'Poppins' }}>
        Do you have an account?
        <span onClick={() => navigate('/sign-in')}> Sign in</span>
      </Typography>
    </>
  );
};
