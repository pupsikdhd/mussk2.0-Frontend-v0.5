"use client";

import { useParams } from "next/navigation";
import { useProfile } from "@/logic/hooks/Profile/useProfile";

export default function ProfileTest() {
    const params = useParams();
    const userId = Array.isArray(params.userId) ? params.userId[0] : params.userId ?? "";

    const { data, isLoading, isError } = useProfile(userId);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading profile</div>;

    if (data?.status !== 'success') return <div>Not found</div>;

    return <div>{data.data.visibilityName}</div>;
}
