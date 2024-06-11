import { useLocation, useNavigate } from 'react-router-dom';
import { SignInPage } from './sign-in';
import { SignUpPage } from './sign-up';
import '../../assets/style.scss';
import { Box } from '@mui/material';
import { useState } from 'react';
import { instance } from '../../utils/axios';
import { useAppDispatch } from '../../store';
import { signIn } from './store/auth.slice';
import { AppErrorsEnum } from '../../common/types/errors/errors';
import { useForm } from 'react-hook-form';

export const AuthRootComponent: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [userName, setUserName] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  console.log('errors-rhf', errors);

  const location = useLocation();

  const handleSubmitForm = async (data: any) => {
    console.log(data, 'data');
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
      if (password === repeatPassword) {
        try {
          const userData = {
            firstName,
            userName,
            email,
            password,
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
              setEmail={setEmail}
              setPassword={setPassword}
              setRepeatPassword={setRepeatPassword}
              setFirstName={setFirstName}
              setUserName={setUserName}
              navigate={navigate}
            />
          ) : null}
        </Box>
      </form>
    </div>
  );
};
