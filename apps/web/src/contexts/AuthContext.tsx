import { createContext, useContext, useEffect, useState } from 'react';
import {
  reactQueryClient,
  type ApiRequest,
  type ApiResponse,
} from 'src/services/api';
import constants from 'src/utils/constants';

type User = ApiResponse['users']['read']['user'];

interface AuthContext {
  isAuthenticated: boolean;
  user: User | null;
  hasInit: boolean;
  isConfirmed: boolean;
  login: (
    opts: ApiRequest['users']['login'],
  ) => Promise<ApiResponse['users']['login']>;
  register: (
    opts: ApiRequest['users']['register'],
  ) => Promise<ApiResponse['users']['register']>;
  logout: () => void;
}

// eslint-disable-next-line -- ignore
const Context = createContext<AuthContext>(undefined as any);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [hasInit, setHasInit] = useState(false);

  const readMeRequest = reactQueryClient.users.me.useQuery(undefined, {
    retry: false,
  });

  useEffect(() => {
    if (readMeRequest.isSuccess && readMeRequest.data.user) {
      setIsAuthenticated(true);
      setUser(readMeRequest.data.user);
      setIsConfirmed(readMeRequest.data.user.isEmailConfirmed);
      setHasInit(true);
    }
  }, [readMeRequest.isSuccess, readMeRequest.data]);

  useEffect(() => {
    if (readMeRequest.isError) {
      setIsAuthenticated(false);
      setUser(null);
      setIsConfirmed(false);
      setHasInit(true);
    }
  }, [readMeRequest.isError]);

  const loginUserRequest = reactQueryClient.users.login.useMutation({
    onSuccess: (response) => {
      setIsAuthenticated(true);
      setUser(response.user);
      setIsConfirmed(response.user.isEmailConfirmed);
      localStorage.setItem(
        constants.LOCAL_STORAGE_ACCESS_TOKEN_KEY,
        response.accessToken,
      );
      localStorage.setItem(
        constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY,
        response.refreshToken,
      );
    },
  });
  const login = (opts: ApiRequest['users']['login']) => {
    return loginUserRequest.mutateAsync(opts);
  };

  const registerUserRequest = reactQueryClient.users.register.useMutation({
    onSuccess: (response) => {
      setIsAuthenticated(true);
      setUser(response.createdUser);
      localStorage.setItem(
        constants.LOCAL_STORAGE_ACCESS_TOKEN_KEY,
        response.accessToken,
      );
      localStorage.setItem(
        constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY,
        response.refreshToken,
      );
    },
  });
  const register = (opts: ApiRequest['users']['register']) => {
    return registerUserRequest.mutateAsync(opts);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(constants.LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY);
  };

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        isConfirmed,
        user,
        hasInit,
        login,
        logout,
        register,
      }}>
      {hasInit ? children : null}
    </Context.Provider>
  );
};

export const useAuthContext = () => {
  // eslint-disable-next-line -- ignore
  if (Context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  const authContext = useContext(Context);
  return authContext;
};
