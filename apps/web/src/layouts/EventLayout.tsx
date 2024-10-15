import { Outlet } from 'react-router-dom';
import AuthGuard from 'src/guards/AuthGuard';

const EventLayout = () => {
  return (
    <AuthGuard requireAuth>
      <Outlet />
    </AuthGuard>
  );
};

export default EventLayout;
