import { injectable, inject } from 'tsyringe';
import {FingerPrintState } from '../../infrastructure/fingerprint/fingerPrint.state';
import {ProfileApiService} from "@/logic/infrastructure/profile/profile.api";
import {ProfileResult} from "@/logic/domain/services/results/Profile";
import {ProfileResponse} from "@/logic/domain/api/response/Profile";

@injectable()
export class ProfileService {

    constructor(
        @inject(FingerPrintState) private fingerprintService: FingerPrintState,
        @inject(ProfileApiService) private profileService: ProfileApiService,
    ) {}

    async get(id: string): Promise<ProfileResult> {
        const fingerPrint = await this.fingerprintService.get();
        const res = await this.profileService.get(id, fingerPrint);
        if(res.status === 404) {
            return {status: 'notfound' };
        }
        const data = res.data as ProfileResponse;
        return {status: 'success', data: data};
    }



}