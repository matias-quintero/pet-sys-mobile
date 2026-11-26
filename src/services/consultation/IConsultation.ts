export interface IConsultationAttachment {
    blobName: string;
    fileName: string | null;
}

export interface IConsultationResponse {
    id: number;
    title: string;
    description: string;
    date: string;
    petId: number;
    veterinarianId: number;
    attachments: IConsultationAttachment[];
    isSuspended: boolean;
}

export interface IConsultationWithParticipantsResponse extends IConsultationResponse {
    petName: string;
    veterinarianName: string;
}