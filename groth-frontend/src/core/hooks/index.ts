import { useAppSelector } from '../store/auth/auth.selector';

export const useAuth = () => {
  const { isLogged } = useAppSelector((state) => state.auth);
  return isLogged;
};
