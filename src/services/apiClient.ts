import * as SecureStore from 'expo-secure-store';
import { translateApiError } from './apiErrors';

export const TOKEN_KEY = 'pet-sys-token';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://localhost:7140/api';
const LOGIN_PATH = '/Authentication/authenticate';

export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

let onUnauthorized: (() => void) | null = null;
export const setOnUnauthorized = (callback: (() => void) | null) => {
    onUnauthorized = callback;
};

export const apiFetch = async (path: string, options: RequestInit = {}): Promise<Response> => {
    const headers = new Headers(options.headers);
    const token = await SecureStore.getItemAsync(TOKEN_KEY);

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    if (typeof options.body === 'string' && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(`${API_URL}${path}`, { ...options, headers });

    if (response.status === 401 && token && path !== LOGIN_PATH) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        onUnauthorized?.();
    }

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        const title = body.title ?? '';
        throw new ApiError(response.status, translateApiError(title) || 'Ocurrió un error. Probá de nuevo.');
    }

    return response;
};