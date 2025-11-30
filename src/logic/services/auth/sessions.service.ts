import { injectable, inject } from 'tsyringe';
import {FingerPrintState } from '../../infrastructure/fingerprint/fingerPrint.state';
import { AuthState } from '@/logic/infrastructure/auth/state/auth.state';
import {SessionsApiService} from "@/logic/infrastructure/auth/sessions/sessions.api";
import {SessionsResult} from "@/logic/domain/services/results/Sessions";
import {SessionResponse} from "@/logic/domain/api/response/Session";
import {ActionResult} from "@/logic/domain/services/results/Action";


@injectable()
export class SessionsService {

    constructor(
        @inject(FingerPrintState) private fingerprintService: FingerPrintState,
        @inject(SessionsApiService) private sessionsService: SessionsApiService,
        @inject(AuthState) private authService: AuthState
    ) {}


    async get(): Promise<SessionsResult>{
        const auth = this.authService.get()
        if (!auth) {
            return {status: 'unauthorized'};
        }
        const fingerPrint = await this.fingerprintService.get();
        const res = await this.sessionsService.get(fingerPrint);
        if(res.status === 401) {
            return {status: 'unauthorized'};
        }
        const data: SessionResponse[] = res.data;
        return {status: 'success', data: data}
    }

    async terminate(publicId: string): Promise<ActionResult> {
        const auth = this.authService.get()
        if (!auth) {
            return {status: 'unauthorized'};
        }
        const fingerPrint = await this.fingerprintService.get();
        const res = await this.sessionsService.terminate(publicId, fingerPrint);
        if(res.status === 401) {
            return {status: 'unauthorized'};
        }
        return {status: 'success'};
    }

    async terminateAll(): Promise<ActionResult> {
        const auth = this.authService.get()
        if (!auth) {
            return {status: 'unauthorized'};
        }

        const fingerPrint = await this.fingerprintService.get();
        const res = await this.sessionsService.terminateAll(fingerPrint);
        if(res.status === 401) {
            return {status: 'unauthorized'};
        }
        await this.authService.logout();
        return {status: 'success'};
    }
}