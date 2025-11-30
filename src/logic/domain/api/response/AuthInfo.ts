
export interface AuthInfoResponse
{
    userId: string,
    publicId: string,
    login: string,
    expiredAt: string,
    startedAt: string,
    canChangeSensitive: boolean,
    roles: number[],
    publicKey: string,
}