import { Navigate } from 'react-router-dom';
import { useAuthContext } from 'src/contexts/AuthContext';
import routes from 'src/router/routes';

interface ConfirmGuardProps {
  requireConfirm?: boolean;
  redirectIfConfirmed?: boolean;
  children: React.ReactNode;
}

// If requireConfirm is true and the user has not confirmed their email, redirect to the notification page.Otherwise, render the children.
// If requireAuth is false and the user is authenticated, redirect to the dashboard. Otherwise, render the children.
const ConfirmGuard: React.FC<ConfirmGuardProps> = ({
  children,
  redirectIfConfirmed = false,
  requireConfirm = false,
}) => {
  const { isConfirmed } = useAuthContext();

  if (redirectIfConfirmed && isConfirmed) {
    return <Navigate replace to={routes.DASHBOARD.HOME.url} />;
  }

  if (!requireConfirm) {
    return children;
  }

  if (!isConfirmed) {
    return (
      <Navigate
        replace
        to={{
          pathname: routes.NEED_CONFIRMATION,
        }}
      />
    );
  }
  return children;
};

export default ConfirmGuard;
