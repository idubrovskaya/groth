import { useLocation, useNavigate } from 'react-router-dom';
import { SignInPage } from './sign-in';
import { SignUpPage } from './sign-up';
import { Box, FormControl } from '@mui/material';
import { useAppDispatch } from '../../core/store/store';
import { AppErrorsEnum } from '../../core/constants/errors';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema, signUpSchema } from '../../core/schemes/yup';
import { signIn, signUp } from '../../core/store/auth/auth.actions';
import { ISignUpData } from '../../core/types/auth';
import { useAppSelector } from '../../core/store/auth/auth.selector';

export const AuthRootComponent: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(
      location.pathname === '/sign-in' ? signInSchema : signUpSchema
    ),
  });

  const loading = useAppSelector((state) => state.auth.isLoading);

  const handleSubmitForm = async (data: any) => {
    if (location.pathname === '/sign-in') {
      try {
        await dispatch(signIn(data));
        navigate('/');
      } catch (error) {
        return error;
      }
    } else {
      if (data.password === data.confirmPassword) {
        try {
          const userData: ISignUpData = {
            firstName: data.name,
            userName: data.username,
            email: data.email,
            password: data.password,
          };
          await dispatch(signUp(userData));

          navigate('/');
        } catch (error) {
          return error;
        }
      } else {
        throw new Error(AppErrorsEnum.PasswordsDoNotMatch);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        width: '100vw',
        height: '100vh',
      }}
    >
      <FormControl
        component={'form'}
        sx={{ flex: 1 }}
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection={'column'}
          maxWidth={640}
          margin={'auto'}
          padding={5}
          borderRadius={5}
          boxShadow={'-3px -2px 20px 1px #202020'}
        >
          {location.pathname === '/sign-in' ? (
            <SignInPage
              register={register}
              errors={errors}
              navigate={navigate}
              loading={loading}
            />
          ) : location.pathname === '/sign-up' ? (
            <SignUpPage
              navigate={navigate}
              register={register}
              errors={errors}
              loading={loading}
            />
          ) : null}
        </Box>
      </FormControl>
    </Box>
  );
};
