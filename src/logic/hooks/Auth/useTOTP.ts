


import {useMutation} from "@tanstack/react-query";
import {ContinueWithTOTPInput} from "@/logic/domain/services/input/ContinueWithTOTP";
import {container} from "@/logic/di/container";
import {TOTPService} from "@/logic/services/auth/totp.service";
import {ActionResult} from "@/logic/domain/services/results/Action";


export function useContinueWithTOTP() {
    const totpService = container.resolve(TOTPService);
    return useMutation<ActionResult, Error, ContinueWithTOTPInput>({
        mutationFn: (input) => totpService.continueWithTOTP(input),
    });
}