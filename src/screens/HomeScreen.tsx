import { Alert, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/contexts/AuthenticationContext';

export default function HomeScreen() {
  const { handleUserLogout } = useAuth();

  const handleLogout = async () => {
    try {
      await handleUserLogout();
    } catch {
      Alert.alert('Error', 'No se pudo cerrar sesión. Probá de nuevo.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Cerrar sesión" onPress={handleLogout} color="#27374D" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
});
