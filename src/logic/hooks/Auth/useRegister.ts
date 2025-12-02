// src/hooks/useRegister.ts

import { useMutation } from '@tanstack/react-query';
import {container} from "@/logic/di/container";
import {AuthService} from "@/logic/services/auth/Auth.service";
import {RegisterResult} from "@/logic/domain/services/results/Register";
import {RegisterInput} from "@/logic/domain/services/input/Register";


const authService = container.resolve(AuthService);



export function useRegister() {

    return useMutation<RegisterResult, Error, RegisterInput>({
        mutationFn: (credentials) => authService.register(credentials),

    });
}