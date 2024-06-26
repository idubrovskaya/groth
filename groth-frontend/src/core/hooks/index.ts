import { useAppSelector } from '../store/auth/auth.selector';

export const useAuth = () => {
  return !!localStorage.getItem('accessToken');
};
