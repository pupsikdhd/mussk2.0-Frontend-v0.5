export interface ContinueWithTOTPRequest
{
    totpCode: string,
    totpChallenge: string,
    fingerPrint: string,
    rememberMe: boolean,
}