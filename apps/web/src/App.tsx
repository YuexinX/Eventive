import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { getQueryKey } from '@trpc/react-query';
import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from 'src/contexts/AuthContext';
import router from 'src/router';
import { helperApi, reactQueryClient } from 'src/services/api';
import constants from 'src/utils/constants';
import { isJwtExpired } from 'src/utils/jwt';

//set up application's main component with providers to handle stuff.
const App = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  const [client] = useState(() =>
    reactQueryClient.createClient({
      links: [
        httpBatchLink({
          url: import.meta.env.VITE_API_URL,

          headers: async () => {
            let accessToken = localStorage.getItem(
              constants.LOCAL_STORAGE_ACCESS_TOKEN_KEY,
            );
            if (accessToken) {
              if (isJwtExpired(accessToken)) {
                const refreshToken = localStorage.getItem(
                  constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY,
                );

                try {
                  const response = await helperApi.users.token.mutate({
                    refreshToken: refreshToken!, // OK here because refreshToken is null then 400 is returned
                  });

                  accessToken = response.accessToken;
                  localStorage.setItem(
                    constants.LOCAL_STORAGE_ACCESS_TOKEN_KEY,
                    accessToken,
                  );
                  localStorage.setItem(
                    constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY,
                    response.refreshToken,
                  );
                } catch (error) {
                  accessToken = null;
                  localStorage.removeItem(
                    constants.LOCAL_STORAGE_ACCESS_TOKEN_KEY,
                  );
                  localStorage.removeItem(
                    constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY,
                  );
                  await queryClient.invalidateQueries({
                    queryKey: getQueryKey(
                      reactQueryClient.users.me,
                      undefined,
                      'query',
                    ),
                  });
                }
              }
            }
            return {
              ...(accessToken && { authorization: `Bearer ${accessToken}` }),
            };
          },
        }),
      ],
    }),
  );
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <reactQueryClient.Provider client={client} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <RouterProvider router={router} />
          </AuthContextProvider>
        </QueryClientProvider>
      </reactQueryClient.Provider>
    </LocalizationProvider>
  );
};

export default App;
