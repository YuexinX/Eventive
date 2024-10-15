import { Navigate } from 'react-router-dom';
import { useAuthContext } from 'src/contexts/AuthContext';
import routes from 'src/router/routes';
import { StringParam, useQueryParam } from 'use-query-params';

interface AuthGuardProps {
  requireAuth: boolean;
  children: React.ReactNode;
}

// If requireAuth is true and the user is not authenticated, redirect to the sign-in page.Otherwise, render the children.
// If requireAuth is false and the user is authenticated, redirect to the dashboard. Otherwise, render the children.
const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireAuth }) => {
  const { isAuthenticated } = useAuthContext();
  const [redirectTo] = useQueryParam('redirectTo', StringParam);

  if (requireAuth && !isAuthenticated) {
    const { pathname, search, hash } = window.location;
    const fullUrl = `${pathname}${search}${hash}`;
    const searchParamsString = new URLSearchParams({
      redirectTo: fullUrl,
    }).toString();

    return (
      <Navigate
        replace
        to={{ pathname: routes.AUTH.SIGN_IN, search: searchParamsString }}
      />
    );
  }

  if (!requireAuth && isAuthenticated) {
    if (redirectTo) {
      return <Navigate replace to={redirectTo} />;
    }
    return <Navigate replace to={routes.DASHBOARD.HOME.url} />;
  }

  return children;
};

export default AuthGuard;
