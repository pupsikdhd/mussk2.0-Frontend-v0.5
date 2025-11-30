import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { SessionsService } from "@/logic/services/auth/sessions.service";
import {container} from "@/logic/di/accountContainer";


export function useSessions() {
    const service = container.resolve(SessionsService);
    return useQuery({
        queryKey: ["sessions"],
        queryFn: () => service.get(),

        staleTime: 1000 * 60 * 3,
        refetchOnWindowFocus: true,
    });
}


export function useTerminateSession() {
    const service = container.resolve(SessionsService);
    const qc = useQueryClient();


    return useMutation({
        mutationFn: (id: string) => service.terminate(id),
    });
}


export function useTerminateAllSessions() {
    const service = container.resolve(SessionsService);
    const qc = useQueryClient();


    return useMutation({
        mutationFn: () => service.terminateAll(),

    });
}