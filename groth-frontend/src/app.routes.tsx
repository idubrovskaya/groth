import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './utils/hook';

export const PrivateRouter = () => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to='sign-in' />;
};
