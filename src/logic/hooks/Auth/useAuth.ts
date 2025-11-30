// src/hooks/useAuth.ts
'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {container} from "@/logic/di/container";

import { AuthInfoResult } from '@/logic/domain/services/results/AuthInfo';
import {AuthService} from "@/logic/services/auth/Auth.service";

const authService = container.resolve(AuthService);


export const USER_AUTH_QUERY_KEY = ['auth'];

export function useAuth() {
    const queryClient = useQueryClient();

    return useMutation<AuthInfoResult>({
        mutationFn: () => authService.getInfo(),

        onSuccess: (result) => {
            if (result.status === 'success') {
                queryClient.invalidateQueries({ queryKey: USER_AUTH_QUERY_KEY });
            }

        },

    });
}