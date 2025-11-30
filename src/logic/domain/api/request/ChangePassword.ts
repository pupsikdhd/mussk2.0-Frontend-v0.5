export interface ChangePasswordRequest {
    oldPassword: string,
    newPassword: string,
    mfaCode: string
}