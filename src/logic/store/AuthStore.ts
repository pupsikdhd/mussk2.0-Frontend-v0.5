// store/AuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    authenticated: boolean;
    setAuthentication: (authentication: boolean) => void;
    logout:() => void
}

export const useAuthStore = create<AuthState>()(
    persist(

        (set) => ({
            authenticated: false,

            setAuthentication: (authentication: boolean) => set({
                authenticated: authentication,
            }),
            logout: () => set({
                authenticated: false,
            }),

        }),

        {
            name: "auth-storage",
        }
    )
);