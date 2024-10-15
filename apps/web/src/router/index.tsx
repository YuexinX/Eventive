import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from 'src/layouts/AuthLayout';
import MainLayout from 'src/layouts/MainLayout';
import RouterLayout from 'src/layouts/RouterLayout';
import IndexPage from 'src/pages';
import NotFoundPage from 'src/pages/404';
import NewPasswordPage from 'src/pages/auth/new-password';
import ResetPasswordPage from 'src/pages/auth/reset-password';
import AuthSignInPage from 'src/pages/auth/sign-in';
import AuthSignUpPage from 'src/pages/auth/sign-up';
import ConfirmEmailPage from 'src/pages/confirm-email';
import NeedConfirmationPage from 'src/pages/need-confirmation';
import ResetCompletePage from 'src/pages/reset-complete';
import SentEmailPage from 'src/pages/sent-email';

import routes from './routes';

// TODO: This is workaround https://github.com/remix-run/react-router/issues/10787
const appRouter: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    element: <RouterLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/',
            element: <IndexPage />,
          },
        ],
      },
      {
        element: <EventLayout />,
        children: [
          {
            path: routes.CREATE_EVENT,
            element: <CreateEventPage />,
          },
          {
            path: routes.EDIT_EVENT,
            element: <EditEventPage />,
          },
        ],
      },
      // AUTH
      {
        element: <AuthLayout />,
        children: [
          {
            path: routes.AUTH.SIGN_IN,
            element: <AuthSignInPage />,
          },
          {
            path: routes.AUTH.SIGN_UP,
            element: <AuthSignUpPage />,
          },
        ],
      },

      {
        path: routes.CONFIRM_EMAIL,
        element: <ConfirmEmailPage />,
      },
      {
        path: routes.NEED_CONFIRMATION,
        element: <NeedConfirmationPage />,
      },
      {
        path: routes.RESET_PASSWORD,
        element: <ResetPasswordPage />,
      },
      {
        path: routes.NEW_PASSWORD,
        element: <NewPasswordPage />,
      },
      {
        path: routes.EMAIL_SENT,
        element: <SentEmailPage />,
      },
      {
        path: routes.RESET_COMPLETE,
        element: <ResetCompletePage />,
      },
      
    ],
  },
]);

export default appRouter;
