import { apiFetch } from '../apiClient';
import type { IPetResponse } from './IPet';

export const handleGetMyPets = async (): Promise<IPetResponse[]> => {
    const response = await apiFetch('/Pet/me');
    return response.json();
};

export const handleGetByIdPet = async (id: string): Promise<IPetResponse> => {
    const response = await apiFetch(`/Pet/${id}`);
    return response.json();
};

export const handleGetPetImageUrl = async (id: string, signal?: AbortSignal): Promise<string> => {
    const response = await apiFetch(`/Pet/${id}/image`, { signal });
    const { url }: { url: string } = await response.json();
    return url;
};