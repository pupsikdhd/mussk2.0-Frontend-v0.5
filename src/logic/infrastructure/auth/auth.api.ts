// src/logic/infrastructure/auth/login/login.api.ts
import axios, { AxiosResponse, AxiosError } from 'axios';
import { injectable } from 'tsyringe';
import {appConfig} from "@/logic/configs/appConfig";
import {LoginRequest} from "@/logic/domain/api/request/Login";
import {RegisterRequest} from "@/logic/domain/api/request/Register";


@injectable()
export class AuthApiService {
    async login(request: LoginRequest): Promise<AxiosResponse> {
        try {
            const response = await axios.post(`${appConfig.backend}/api/account/login`, request, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
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

    async register(request: RegisterRequest): Promise<AxiosResponse> {
        const response = await axios.post(`${appConfig.backend}/api/account/register`,request,
            {
            headers:{
                'Content-Type': 'application/json'
            },
                withCredentials:true,
                validateStatus:() => true
        })
        return response;
    }

    async logout(fingerPrint: string): Promise<AxiosResponse> {
        const response = await axios.delete(`${appConfig.backend}/api/account/logout`, {
            headers: {
                'Content-Type': 'application/json',
                'FingerPrint': fingerPrint
            },
            validateStatus: () => true,
            withCredentials: true
        });
        return response;
    }

    async getInfo(fingerPrint: string): Promise<AxiosResponse> {
        const response = await axios.get(`${appConfig.backend}/api/account/info`, {
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