import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginForm } from '@/components/auth/LoginForm';
import { validateLoginForm, type FormErrors, } from '@/components/auth/loginValidation';
import { useAuth } from '@/contexts/AuthenticationContext';
import { ApiError } from '@/services/apiClient';
import { HandleLogin } from '@/services/auth/authService';
import type { ILoginRequest } from '@/services/auth/IAuth';

export default function LoginScreen() {
  const { handleUserLogin } = useAuth();

  const [form, setForm] = useState<ILoginRequest>({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleChange = (field: keyof ILoginRequest, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: '' }));
    setFormError('');
  };

  const handleLogin = async () => {
    if (isLoggingIn) return;

    const errors = validateLoginForm(form);
    setFieldErrors(errors);
    setFormError('');

    if (Object.keys(errors).length > 0) return;

    setIsLoggingIn(true);

    try {
      const { token } = await HandleLogin({
        email: form.email.trim(),
        password: form.password,
      });

      const accepted = await handleUserLogin(token);

      if (!accepted) {
        setFormError('No se pudo aceptar la sesión. Esta aplicación es exclusiva para clientes.');
        return;
      }

      setForm((current) => ({ ...current, password: '' }));
    } catch (error) {
      setFormError(
        error instanceof ApiError ? error.message : 'No se pudo iniciar sesión. Probá de nuevo.',
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.keyboardArea}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.content}>
          <View style={styles.card}>
            <Image
              source={require('@/assets/images/4patas-logo-azul.png')}
              accessibilityLabel="4Patas"
              resizeMode="contain"
              style={styles.logo}
            />
            <Text accessibilityRole="header" style={styles.title}>Iniciar sesión</Text>
            <LoginForm
              form={form}
              formError={formError}
              fieldErrors={fieldErrors}
              isLoggingIn={isLoggingIn}
              onChange={handleChange}
              onLogin={handleLogin}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#DDE6ED',
  },
  keyboardArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    maxHeight: '100%',
    flexShrink: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 28,
    borderWidth: 1,
    borderColor: '#C7D6E2',
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 118,
    height: 118,
    flexShrink: 1,
    alignSelf: 'center',
  },
  title: {
    marginBottom: 28,
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    color: '#27374D',
  },
});
