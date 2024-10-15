import { Outlet } from 'react-router-dom';
import AuthGuard from 'src/guards/AuthGuard';

const AuthLayout = () => {
  return (
    <AuthGuard requireAuth={false}>
      <Outlet />
    </AuthGuard>
  );
};

export default AuthLayout;
