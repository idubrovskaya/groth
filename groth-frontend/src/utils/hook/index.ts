import { useAppSelector } from '../../app/auth/store/auth.selector';

export const useAuth = () => {
  const { isLogged } = useAppSelector((state) => state.auth);
  return isLogged;
};
