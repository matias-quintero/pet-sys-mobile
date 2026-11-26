import { apiFetch } from '../apiClient';
import type { IConsultationResponse, IConsultationWithParticipantsResponse } from './IConsultation';

export const handleGetConsultationsByPet = async (petId: number): Promise<IConsultationResponse[]> => {
    const response = await apiFetch(`/Consultation/pet/${petId}`);
    return response.json();
};

export const handleGetByIdConsultation = async (id: string): Promise<IConsultationWithParticipantsResponse> => {
    const response = await apiFetch(`/Consultation/${id}`);
    return response.json();
};

export const handleGetConsultationAttachmentUrl = async (id: string, blobName: string): Promise<string> => {
    const response = await apiFetch(`/Consultation/${id}/attachments?blobName=${encodeURIComponent(blobName)}`);
    const { url }: { url: string } = await response.json();
    return url;
};