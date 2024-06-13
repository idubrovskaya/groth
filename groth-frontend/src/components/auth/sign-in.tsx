import { Box, Button, TextField, Typography } from '@mui/material';
import { IPropsSignIn } from '../../core/types/auth';
import { AppButton } from '../ui/button';

export const SignInPage: React.FC<IPropsSignIn> = (
  props: IPropsSignIn
): JSX.Element => {
  const { register, navigate, errors } = props;
  return (
    <>
      <Typography variant='h5' textAlign={'center'} padding={2}>
        Sign in
      </Typography>

      <Typography variant='body1' textAlign={'center'} marginBottom={3}>
        Enter your login and password
      </Typography>
      <Box>
        <TextField
          margin='normal'
          fullWidth
          error={!!errors.email}
          helperText={errors.email ? `${errors.email.message}` : ''}
          // required
          autoFocus
          label='Email'
          variant='outlined'
          placeholder='Enter your email'
          {...register('email')}
        />
        <TextField
          margin='normal'
          // required
          fullWidth
          error={!!errors.password}
          helperText={errors.password ? `${errors.password.message}` : ''}
          type='password'
          label='Password'
          variant='outlined'
          placeholder='Enter your password'
          {...register('password')}
        />
      </Box>
      <AppButton variant='contained' type='submit'>
        Sign in
      </AppButton>

      <Typography variant='body1' sx={{ fontFamily: 'Poppins' }}>
        Don't have an account?
        <span
          onClick={() => navigate('/sign-up')}
          style={{ color: '#1900D5', marginLeft: '10px', cursor: 'pointer' }}
        >
          Sign up
        </span>
      </Typography>
    </>
  );
};
