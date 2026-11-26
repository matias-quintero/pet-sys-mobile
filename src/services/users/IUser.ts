export type UserRole = 'Client' | 'Veterinarian' | 'Admin' | 'SysAdmin';

export interface IUserResponse {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    isSuspended: boolean;
    roleName: string;
    dni: string | null;
    registrationNumber: string | null;
}