import { createContext, useContext } from 'react';

interface AuthenticationContextValue {
  token: string | null;
  isLoading: boolean;
  handleUserLogin: (newToken: string) => Promise<boolean>;
  handleUserLogout: () => Promise<void>;
}

export const AuthenticationContext =
  createContext<AuthenticationContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      'useAuth debe usarse dentro de un AuthenticationContextProvider',
    );
  }

  return context;
};