

export interface SessionResponse {
    publicId: string,
    userAgent: string,
    ipAddress: string,
    startedAt: string,
    expiredAt: string,
    thisDevice: boolean
}