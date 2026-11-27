import type { ILoginRequest } from '@/services/auth/IAuth';

export type FormErrors = Partial<Record<keyof ILoginRequest, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginForm(form: ILoginRequest): FormErrors {
  const errors: FormErrors = {};

  const email = form.email.trim();

  if (!email) {
    errors.email = 'El correo electrónico es obligatorio.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Ingresá un correo electrónico válido.';
  }

  if (!form.password.trim()) {
    errors.password = 'La contraseña es obligatoria.';
  } else if (form.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres.';
  } else if (form.password.length > 100) {
    errors.password = 'La contraseña no puede superar los 100 caracteres.';
  }

  return errors;
}