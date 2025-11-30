// infrastructure/auth/state/AuthState.ts
'use client'
import { injectable } from "tsyringe";
import {useAuthInfoStore} from "@/logic/store/AuthInfoStore";
import {AuthInfoResponse} from "@/logic/domain/api/response/AuthInfo";



@injectable()
export class AuthInfoStore {

    async get(): Promise<AuthInfoResponse | null> {
        const store = useAuthInfoStore.getState();
        return store.authenticated;
    }

    async set(authentication: AuthInfoResponse): Promise<void> {
        const store = useAuthInfoStore.getState();
        store.setAuthentication(authentication);
    }

    async remove(): Promise<void> {
        const store = useAuthInfoStore.getState();
        store.remove();
    }
}
