import { useLocation, useNavigate } from 'react-router-dom';
import { SignInPage } from './sign-in';
import { SignUpPage } from './sign-up';
import '../../assets/style.scss';
import { Box } from '@mui/material';
import { instance } from '../../utils/axios';
import { useAppDispatch } from '../../store';
import { signIn } from './store/auth.slice';
import { AppErrorsEnum } from '../../common/types/errors/errors';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema, signUpSchema } from '../../utils/yup/yup';

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

  const handleSubmitForm = async (data: any) => {
    if (location.pathname === '/sign-in') {
      try {
        const userData = {
          email: data.email,
          password: data.password,
        };

        const user = await instance.post('auth/sign-in', userData);
        await dispatch(signIn(user.data));
        navigate('/');
      } catch (error) {
        return error;
      }
    } else {
      if (data.password === data.confirmPassword) {
        try {
          const userData = {
            firstName: data.name,
            userName: data.username,
            email: data.email,
            password: data.password,
          };
          const newUser = await instance.post('auth/sign-up', userData);
          await dispatch(signIn(newUser.data));
          navigate('/');
        } catch (error) {
          console.log(error);
          return error;
        }
      } else {
        throw new Error(AppErrorsEnum.PasswordsDoNotMatch);
      }
    }
  };

  return (
    <div className='root'>
      <form className='form' onSubmit={handleSubmit(handleSubmitForm)}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection={'column'}
          maxWidth={640}
          margin={'auto'}
          padding={5}
          borderRadius={5}
          boxShadow={'5px 5px 10px #ccc'}
        >
          {location.pathname === '/sign-in' ? (
            <SignInPage
              register={register}
              errors={errors}
              navigate={navigate}
            />
          ) : location.pathname === '/sign-up' ? (
            <SignUpPage
              navigate={navigate}
              register={register}
              errors={errors}
            />
          ) : null}
        </Box>
      </form>
    </div>
  );
};
