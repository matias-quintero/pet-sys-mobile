import { useRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type TextInputInstance } from 'react-native';

interface LoginFormProps {
  form: { email: string; password: string; };
  formError: string;
  fieldErrors: { email?: string; password?: string; };
  isLoggingIn: boolean;
  onChange: (field: 'email' | 'password', value: string) => void;
  onLogin: () => void;
}

export function LoginForm({
  form,
  formError,
  fieldErrors,
  isLoggingIn,
  onChange,
  onLogin,
}: LoginFormProps) {
  const passwordInput = useRef<TextInputInstance>(null);

  return (
    <View style={styles.form}>
      <View>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          accessibilityLabel="Correo electrónico"
          style={[
            styles.input,
            fieldErrors.email && styles.inputError,
            isLoggingIn && styles.inputDisabled,
          ]}
          selectionColor="#27374D"
          value={form.email}
          onChangeText={(value) => onChange('email', value)}
          keyboardType="email-address"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => passwordInput.current?.focus()}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          editable={!isLoggingIn}
        />
        {fieldErrors.email ? (
          <Text accessibilityRole="alert" style={styles.error}>{fieldErrors.email}</Text>
        ) : null}
      </View>

      <View>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          ref={passwordInput}
          accessibilityLabel="Contraseña"
          style={[
            styles.input,
            fieldErrors.password && styles.inputError,
            isLoggingIn && styles.inputDisabled,
          ]}
          selectionColor="#27374D"
          value={form.password}
          onChangeText={(value) => onChange('password', value)}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={onLogin}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="current-password"
          editable={!isLoggingIn}
        />
        {fieldErrors.password ? (
          <Text accessibilityRole="alert" style={styles.error}>{fieldErrors.password}</Text>
        ) : null}
      </View>

      {formError ? (
        <Text accessibilityRole="alert" style={[styles.error, styles.formError]}>
          {formError}
        </Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: isLoggingIn, busy: isLoggingIn }}
        onPress={onLogin}
        disabled={isLoggingIn}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          isLoggingIn && styles.buttonDisabled,
        ]}>
        <Text style={styles.buttonText}>{isLoggingIn ? 'Ingresando...' : 'Ingresar'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 18,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#27374D',
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#849BAD',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#27374D',
    backgroundColor: '#F6F9FC',
  },
  inputError: {
    borderColor: '#9F2926',
  },
  inputDisabled: {
    opacity: 0.5,
  },
  error: {
    marginTop: 6,
    color: '#9F2926',
    fontSize: 14,
    lineHeight: 20,
  },
  formError: {
    marginTop: 0,
  },
  button: {
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    backgroundColor: '#27374D',
  },
  buttonPressed: {
    backgroundColor: '#3B516C',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
});
