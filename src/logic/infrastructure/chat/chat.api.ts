// src/logic/infrastructure/profile/profile.api.ts
import axios, { AxiosResponse } from 'axios';
import { injectable } from 'tsyringe';
import {appConfig} from "@/logic/configs/appConfig";


@injectable()
export class ChatApiService {

    async getChats(fingerPrint: string): Promise<AxiosResponse> {
        const response = await axios.get(`${appConfig.backend}/api/chat/`, {
            headers: {
                'Content-Type': 'application/json',
                'FingerPrint': fingerPrint
            },
            validateStatus: () => true,
            withCredentials: true
        });
        return response;
    }
    async getChat(chatId: string, fingerPrint:string): Promise<AxiosResponse> {
        const response = await axios.get(`${appConfig.backend}/api/chat/${chatId}`, {
            headers: {
                'Content-Type': 'application/json',
                'FingerPrint': fingerPrint
            },
            validateStatus: () => true,
            withCredentials: true
        });
        return response;
    }

    async leaveFromChat(chatId: string, fingerPrint:string): Promise<AxiosResponse> {
        const response = await axios.delete(`${appConfig.backend}/api/chat/${chatId}/leave`, {
            headers: {
                'Content-Type': 'application/json',
                'FingerPrint': fingerPrint
            },
            validateStatus: () => true,
            withCredentials: true
        });
        return response;
    }

    async kickFromChat(chatId: string, memberId: string, fingerPrint:string): Promise<AxiosResponse> {
        const response = await axios.delete(`${appConfig.backend}/api/chat/${chatId}/kick/${memberId}`, {
            headers: {
                'Content-Type': 'application/json',
                'FingerPrint': fingerPrint
            },

            validateStatus: () => true,
            withCredentials: true
        });
        return response;
    }

    async deleteChat(chatId: string, fingerPrint:string): Promise<AxiosResponse> {
        const response = await axios.delete(`${appConfig.backend}/api/chat/${chatId}/delete`, {
            headers:{
                'Content-Type': 'application/json',
                'FingerPrint': fingerPrint
            },
            validateStatus: () => true,
            withCredentials: true
        })
        return response;
    }

    async getKeys(chatId: string, fingerPrint:string): Promise<AxiosResponse> {
        const response = await axios.get(`${appConfig.backend}/api/chat/${chatId}/keys`, {
            headers:{
                'Content-Type': 'application/json',
                'FingerPrint': fingerPrint
            },
            validateStatus:() => true,
            withCredentials: true
        })
        return response;
    }
}