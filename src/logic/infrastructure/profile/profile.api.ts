// src/logic/infrastructure/profile/profile.api.ts
import axios, { AxiosResponse } from 'axios';
import { injectable } from 'tsyringe';
import {appConfig} from "@/logic/configs/appConfig";


@injectable()
export class ProfileApiService {

    async get(id: string, fingerPrint: string): Promise<AxiosResponse> {
        const response = await axios.get(`${appConfig.backend}/api/profile/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'FingerPrint': fingerPrint
            },
            validateStatus: () => true,
            withCredentials: true
        });
        return response;
    }
}