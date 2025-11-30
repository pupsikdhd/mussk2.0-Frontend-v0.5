import {injectable} from "tsyringe";
import axios, {AxiosResponse} from "axios";
import {appConfig} from "@/logic/configs/appConfig";

@injectable()
export class SessionsApiService {
    async get(fingerPrint: string): Promise<AxiosResponse> {
        const response = await axios.get(`${appConfig.backend}/api/sessions/`, {
            headers: {
                'Content-Type': 'application/json',
                'FingerPrint': fingerPrint
            },
            validateStatus: () => true,
            withCredentials: true
        });
        return response;
    }

    async terminate(publicId: string, fingerPrint: string): Promise<AxiosResponse> {
        const response = await axios.delete(`${appConfig.backend}/api/sessions/${publicId}`, {
            withCredentials: true,
            validateStatus: () => true,
            headers:{
                'Content-Type': 'application/json',
                'FingerPrint': fingerPrint
            }
        })
        return response;
    }

    async terminateAll(fingerPrint: string): Promise<AxiosResponse> {
        const response = await axios.delete(`${appConfig.backend}/api/sessions/`, {
            withCredentials: true,
            validateStatus: () => true,
            headers:{
                'Content-Type': 'application/json',
                'FingerPrint': fingerPrint
            }
        })
        return response;
    }
}