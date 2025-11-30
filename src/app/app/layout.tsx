'use client';

import {useEffect} from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/logic/hooks/Auth/useAuth";
import { Loader } from "@/components/ui/loader";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/ui/app-sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { mutate: authMutate, isPending, data: result } = useAuth();
    const router = useRouter();

    useEffect(() => {
        authMutate();
    }, [authMutate]);

    useEffect(() => {
        if (isPending) return;
        if (!result) return;

        if (result.status === 'unauthorized') {
            router.push("/auth/signin");
        }
    }, [result, isPending, router]);

    return (

        <SidebarProvider>

            <AppSidebar/>
            <SidebarTrigger />
        {isPending ? <Loader/> : children}
        </SidebarProvider>
    );
}
