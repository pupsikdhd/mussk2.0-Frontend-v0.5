// src/hooks/useLogout.ts

import { useMutation } from '@tanstack/react-query';
import {container} from "@/logic/di/container";
import {AuthService} from "@/logic/services/auth/Auth.service";


export function useLogout() {
    const authService = container.resolve(AuthService);

    return useMutation<void, Error>({
        mutationFn: () => authService.logout(),
    });
}


