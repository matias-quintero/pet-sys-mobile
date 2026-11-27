import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthenticationContextProvider from '@/contexts/AuthenticationContextProvider';
import AppNavigator from '@/navigation/AppNavigator';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <AuthenticationContextProvider>
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AppNavigator />
        </NavigationContainer>
      </AuthenticationContextProvider>
    </SafeAreaProvider>
  );
}
