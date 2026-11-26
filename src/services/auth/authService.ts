import * as SecureStore from 'expo-secure-store';
import { apiFetch, TOKEN_KEY }  from '../apiClient'; 
import type { IUserResponse } from '../users/IUser';
import type { ILoginRequest } from './IAuth';

export const HandleLogin = async (loginRequest: ILoginRequest) => {
    const response = await apiFetch('/Authentication/authenticate', {
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });

    const token = (await response.text()).trim();

    if (!token) {
        throw new Error('La API devolvió un token vacío.');
    }

    await SecureStore.setItemAsync(TOKEN_KEY, token);
    return { token };
};

export const handleGetCurrentUser = async (): Promise<IUserResponse> => {
    const response = await apiFetch('/User/me');
    return response.json();
};