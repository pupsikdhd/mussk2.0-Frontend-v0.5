// infrastructure/auth/login/totp/totp.api.ts

import axios, { AxiosResponse, AxiosError } from 'axios';
import { injectable } from 'tsyringe';
import {appConfig} from "@/logic/configs/appConfig";
import {ContinueWithTOTPRequest} from "@/logic/domain/api/request/TOTPContinue";

@injectable()

export class TOTPApiService {

    async continueWithTOTP(request: ContinueWithTOTPRequest): Promise<AxiosResponse> {
        try {
            const response = await axios.post(`${appConfig.backend}/api/TOTP/continue`, request, {

                headers: {

                    'Content-Type': 'application/json'
                },
                withCredentials: true,
                validateStatus:() => true,
            });

            return response;

        } catch (error) {

            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 401) {
                return axiosError.response;
            }
            throw error;

        }

    }



    async startEnablingTOTP(fingerPrint: string): Promise<AxiosResponse> {
        const response = await axios.post(`${appConfig.backend}/api/TOTP/enable/start`, null, {
            headers:{
                'Content-Type': 'application/json',
                'FingerPrint': fingerPrint
            },
            withCredentials: true,
            validateStatus: () => true,
        });
        return response;

    }



    async confirmEnablingTOTP(code:number, fingerPrint: string): Promise<AxiosResponse> {
        const response = await axios.post(`${appConfig.backend}/api/TOTP/enable/confirm?code=${code}`, null, {
            headers:{
                'Content-Type': 'application/json',
                'FingerPrint': fingerPrint
            },
            withCredentials: true,
            validateStatus:() => true,
        });

        return response;
    }



    async disableTOTP(code: number,fingerPrint: string): Promise<AxiosResponse> {
        const response = await axios.delete(`${appConfig.backend}/api/TOTP/disable?code=${code}`, {
            headers:{
                'Content-Type': 'application/json',
                'FingerPrint': fingerPrint
            },
            validateStatus:() => true,
        })
        return response;
    }



    async hasTOTP(fingerPrint: string): Promise<AxiosResponse> {
        const response = await axios.get(`${appConfig.backend}/api/TOTP/has`, {
            headers:{
                'Content-Type': 'application/json',
                'FingerPrint': fingerPrint
            },
            withCredentials: true,
            validateStatus:() => true,
        })

        return response

    }

}