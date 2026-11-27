import { useEffect, useState, type ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

import { TOKEN_KEY, setOnUnauthorized } from '@/services/apiClient';
import { isClientTokenValid } from '@/utils/auth';
import { AuthenticationContext } from './AuthenticationContext';

interface Props {
  children: ReactNode;
}

export default function AuthenticationContextProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setOnUnauthorized(() => {
      setToken(null);
    });
    const restoreSession = async () => {
      try {
        const savedToken = await SecureStore.getItemAsync(TOKEN_KEY);

        if (isClientTokenValid(savedToken)) {
          setToken(savedToken);
        } else if (savedToken) {
          await SecureStore.deleteItemAsync(TOKEN_KEY);
        }
      } catch (error) {
        console.error('No se pudo recuperar la sesión.', error);
      } finally {
        setIsLoading(false);
      }
    };

    void restoreSession();
    return () => {
      setOnUnauthorized(null);
    };

  }, []);

  const handleUserLogin = async (newToken: string): Promise<boolean> => {
    if (!isClientTokenValid(newToken)) return false;

    await SecureStore.setItemAsync(TOKEN_KEY, newToken);
    setToken(newToken);

    return true;
  };

  const handleUserLogout = async (): Promise<void> => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setToken(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{ token, isLoading, handleUserLogin, handleUserLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
}