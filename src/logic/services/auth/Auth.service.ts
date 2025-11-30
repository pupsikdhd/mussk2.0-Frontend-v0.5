
import { injectable, inject } from 'tsyringe';
import {FingerPrintState } from '../../infrastructure/fingerprint/fingerPrint.state';
import {AuthInfoResponse} from "@/logic/domain/api/response/AuthInfo";

import {AuthInfoResult} from "@/logic/domain/services/results/AuthInfo";
import {AuthState} from '@/logic/infrastructure/auth/state/auth.state';
import {LoginInput} from "@/logic/domain/services/input/Login";
import {LoginResult} from "@/logic/domain/services/results/Login";
import {LoginRequest} from "@/logic/domain/api/request/Login";
import {LoginResponse} from "@/logic/domain/api/response/Login";
import {AuthApiService} from "@/logic/infrastructure/auth/auth.api";
import {AuthInfoStore} from "@/logic/infrastructure/auth/state/authInfo.state";


@injectable()
export class AuthService {

    constructor(
        @inject(AuthApiService) private authApi: AuthApiService,
        @inject(FingerPrintState) private fingerprintService: FingerPrintState,
        @inject(AuthState) private authState: AuthState,
        @inject(AuthInfoStore) private authInfoStore: AuthInfoStore
    ) {}

    async logout(): Promise<void> {
        if(!await this.authState.get())
            return;

        const fingerPrint = await this.fingerprintService.get();
        await this.authApi.logout(fingerPrint);
        await this.authState.logout();
    }

    async getInfo(): Promise<AuthInfoResult> {

        const auth = await this.authState.get()
        console.log(auth);
        if(!auth){
            console.log("unauthorized")
            return { status: 'unauthorized' };
        }

        const fingerPrint = await this.fingerprintService.get();

        const response = await this.authApi.getInfo(fingerPrint);
        const data = response.data as AuthInfoResponse;
        if(response.status === 401){
            console.log("401 response")
            await this.authState.logout();
            return { status: 'unauthorized' };
        }
        this.authInfoStore.set
        console.log(data);
        return { status: 'success', data: data };
    }

    async login(input: LoginInput): Promise<LoginResult> {
        const fingerPrint = await this.fingerprintService.get();
        const fullRequest: LoginRequest = { ...input, fingerPrint };

        const response = await this.authApi.login(fullRequest);
        const data = response.data as LoginResponse;
        if (data.message === 'MFA') {
            return { status: 'mfa', token: data.token };
        }
        if(response.status === 200) {
            await this.authState.set(true)
            return  {status: 'success', token: data.token };
        }

        return { status: 'unauthorized' };
    }
}