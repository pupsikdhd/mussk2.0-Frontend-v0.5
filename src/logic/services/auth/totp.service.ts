import { injectable, inject } from 'tsyringe';
import {FingerPrintState } from '../../infrastructure/fingerprint/fingerPrint.state';

import {AuthState} from '@/logic/infrastructure/auth/state/auth.state';

import {ActionResult} from "@/logic/domain/services/results/Action";
import {ContinueWithTOTPInput} from "@/logic/domain/services/input/ContinueWithTOTP";
import {ContinueWithTOTPRequest} from "@/logic/domain/api/request/TOTPContinue";
import {StartEnablingTOTPResult} from "@/logic/domain/services/results/TOTPEnabling";
import {StartEnablingTOTPResponse} from "@/logic/domain/api/response/TOTPEnabling";
import {TOTPApiService} from "@/logic/infrastructure/auth/totp.api";


@injectable()
export class TOTPService {

    constructor(
        @inject(FingerPrintState) private fingerprintService: FingerPrintState,
        @inject(TOTPApiService) private totpService: TOTPApiService,
        @inject(AuthState) private authService: AuthState
    ) {}

    async continueWithTOTP(input: ContinueWithTOTPInput): Promise<ActionResult>{
        const fingerPrint = await this.fingerprintService.get();
        const request: ContinueWithTOTPRequest = {...input, fingerPrint}
        const res = await this.totpService.continueWithTOTP(request)
        if(res.status === 401){

        }
        return {status:'success'}
    }
    async disableTOTP(code: number): Promise<ActionResult>{
        const auth = this.authService.get()
        if(!auth)
            return {status:'unauthorized'}

        const fingerPrint = await this.fingerprintService.get();
        const res = await  this.totpService.disableTOTP(code, fingerPrint);
        if(res.status === 401){
            return {status:'unauthorized'}
        }
        return {status:'success'}
    }
    async startEnablingTOTP(): Promise<StartEnablingTOTPResult>{
        const auth = this.authService.get()
        if(!auth)
            return {status:'unauthorized'}

        const fingerPrint = await this.fingerprintService.get();
        const res = await this.totpService.startEnablingTOTP(fingerPrint);
        const data = res.data as StartEnablingTOTPResponse;
        if(res.status === 401){
            return {status:'unauthorized'}
        }
        return {status:'success', data: data}
    }

    async confirmEnablingTOTP(code: number): Promise<ActionResult>{
        const auth = this.authService.get()
        if(!auth){
            return {status:'unauthorized'}
        }

        const fingerPrint = await this.fingerprintService.get();
        const res = await  this.totpService.confirmEnablingTOTP(code, fingerPrint);
        if(res.status === 401){
            return {status:'unauthorized'}
        }
        return {status:'success'}
    }


}