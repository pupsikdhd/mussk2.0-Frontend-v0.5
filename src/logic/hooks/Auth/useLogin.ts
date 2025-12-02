// src/hooks/useLogin.ts

import { useMutation } from '@tanstack/react-query';
import { LoginResult } from '@/logic/domain/services/results/Login';
import { LoginInput } from '@/logic/domain/services/input/Login';
import {container} from "@/logic/di/container";
import {AuthService} from "@/logic/services/auth/Auth.service";


const authService = container.resolve(AuthService);



export function useLogin() {

    return useMutation<LoginResult, Error, LoginInput>({
        mutationFn: (credentials) => authService.login(credentials),

    });
}