import { jwtDecode, type JwtPayload } from 'jwt-decode';

interface TokenPayload extends JwtPayload {
  role?: string;
}

export const isClientTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const { exp, role } = jwtDecode<TokenPayload>(token);

    if (typeof exp !== 'number' || !Number.isFinite(exp)) {
      return false;
    }

    return Date.now() / 1000 < exp && role === 'Client';
  } catch {
    return false;
  }
};