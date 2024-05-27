import { Box, Button, TextField, Typography } from '@mui/material';
import { IPropsSignIn } from '../../common/types/auth';

export const SignInPage: React.FC<IPropsSignIn> = (
  props: IPropsSignIn
): JSX.Element => {
  const { setEmail, setPassword, navigate } = props;
  return (
    <>
      <Typography
        component='h1'
        variant='h5'
        textAlign={'center'}
        fontFamily={'Poppins'}
        padding={2}
      >
        Sign in
      </Typography>

      <Typography
        variant='body1'
        fontFamily={'Poppins'}
        textAlign={'center'}
        marginBottom={3}
      >
        Enter your login and password
      </Typography>
      <Box>
        <TextField
          margin='normal'
          fullWidth
          required
          autoFocus
          label='Email'
          variant='outlined'
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          type='password'
          label='Password'
          variant='outlined'
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Button
        sx={{ fontFamily: 'Poppins', m: 2, width: '60%' }}
        variant='contained'
        type='submit'
      >
        Sign in
      </Button>

      <Typography variant='body1' sx={{ fontFamily: 'Poppins' }}>
        Don't have an account?
        <span onClick={() => navigate('/sign-up')}>Sign up</span>
      </Typography>
    </>
  );
};
