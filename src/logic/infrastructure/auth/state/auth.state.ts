// infrastructure/auth/state/AuthState.ts
'use client'
import { injectable } from "tsyringe";
import {useAuthStore} from "@/logic/store/AuthStore";


@injectable()
export class AuthState {

    async get(): Promise<boolean> {
        const store = useAuthStore.getState();
        console.log("Авторизация: "+ store.authenticated);
        return  store.authenticated;
    }

    async set(authentication: boolean): Promise<void> {
        console.log("Авторизация: "+ authentication);
        const store = useAuthStore.getState();
        store.setAuthentication(authentication);
    }

    async logout(): Promise<void> {
        const store = useAuthStore.getState();
        console.log("Выход");
        store.logout();
    }
}
