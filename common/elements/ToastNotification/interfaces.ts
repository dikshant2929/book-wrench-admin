export interface TosterProps {
    flag?: any;
    isSuccess?: boolean;
    message?: string | null;
}

export interface TostProps {
    status: 'Success' | 'Error' | 'Warning' | 'Info';
    msg: string;
}
