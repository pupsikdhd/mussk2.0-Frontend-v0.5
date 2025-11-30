// store/AuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthInfoResponse } from "@/logic/domain/api/response/AuthInfo";

interface AuthInfoStore {
    authenticated: AuthInfoResponse | null;
    setAuthentication: (authentication: AuthInfoResponse) => void;
    remove: () => void;
}

export const useAuthInfoStore = create<AuthInfoStore>()(
    persist(
        (set) => ({
            authenticated: null,

            setAuthentication: (authentication: AuthInfoResponse) =>
                set({ authenticated: authentication }),

            remove: () => set({ authenticated: null }),
        }),
        {
            name: "auth-info",
        }
    )
);
