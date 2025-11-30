import { useQuery } from '@tanstack/react-query';
import { container } from "@/logic/di/container";
import { ProfileService } from "@/logic/services/Profile/profile.service";
import { ProfileResult } from "@/logic/domain/services/results/Profile";

export function useProfile(id: string) {
    const profileService = container.resolve(ProfileService);

    return useQuery<ProfileResult, Error>({
        queryKey: ['profile', id],
        queryFn: () => profileService.get(id),

        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
}
