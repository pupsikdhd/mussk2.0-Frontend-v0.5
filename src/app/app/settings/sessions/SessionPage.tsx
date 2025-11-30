'use client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader } from "@/components/ui/loader";
import { useSessions, useTerminateAllSessions, useTerminateSession } from "@/logic/hooks/Sessions/useSession";
import { useRouter } from "next/navigation";
import SessionElement from "@/components/sessions/sessionElement";
import {Shield, Loader2, LogOut, CheckCircle } from "lucide-react";

export function SessionsPage() {
    const { data, isLoading } = useSessions();
    const terminate = useTerminateSession();
    const terminateAll = useTerminateAllSessions();
    const router = useRouter();
    const isTerminatingAll = terminateAll.isPending;
    const isSuccessAll = terminateAll.isSuccess;

    if (isLoading) return <Loader />;

    if (!data || data.status !== "success") {
        if (!isLoading) {
            router.push("/auth/signin");
        }
        return (
            <div className="text-center p-10 text-red-500 dark:text-red-400">
                <Shield className="w-12 h-12 mx-auto mb-3" />
                <p>Не удалось загрузить сессии. Требуется авторизация.</p>
            </div>
        );
    }
    // ...

    const otherSessions = data.data.filter(s => !s.thisDevice);
    const currentSession = data.data.find(s => s.thisDevice);

    return (

        <div className="w-full flex justify-center py-8 px-4">
            <div className="w-full max-w-3xl">
                <div className="space-y-6">
                    <Card className="rounded-xl shadow-2xl dark:shadow-neutral-900/50">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                <Shield className="w-6 h-6 text-primary"/> Активные сессии
                            </CardTitle>
                            <CardDescription>
                                Просмотрите и управляйте всеми устройствами, подключенными к вашему аккаунту.
                                Для безопасности завершайте те сессии, которые вам не знакомы.
                            </CardDescription>
                        </CardHeader>

                        <Separator className="bg-gray-200 dark:bg-gray-700"/>

                        <CardContent className="pt-6 space-y-6">

                            {currentSession && (
                                <>
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        Текущая сессия
                                    </h3>
                                    <SessionElement session={currentSession} terminate={terminate} />
                                </>
                            )}

                            {otherSessions.length > 0 && (
                                <>
                                    <Separator className="bg-gray-100 dark:bg-neutral-700/50"/>
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        Другие сессии ({otherSessions.length})
                                    </h3>
                                    <div className="space-y-4">
                                        {otherSessions.map((s) => (
                                            <SessionElement key={s.publicId} session={s} terminate={terminate} />
                                        ))}
                                    </div>
                                </>
                            )}

                            {otherSessions.length === 0 && !currentSession && (
                                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                                    <CheckCircle className="w-10 h-10 mx-auto mb-3 text-green-500"/>
                                    <p className="text-lg font-medium">Нет активных сессий, кроме текущей.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="pt-4">
                        <Button
                            className="w-full h-12 text-lg rounded-xl transition-all duration-300"
                            variant={isSuccessAll ? "default" : "destructive"}
                            onClick={() => terminateAll.mutate()}
                            disabled={isTerminatingAll || isSuccessAll}
                        >
                            {isSuccessAll ? (
                                <>
                                    <CheckCircle className="w-5 h-5 mr-2"/>
                                    Все сессии завершены
                                </>
                            ) : isTerminatingAll ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin"/>
                                    Завершение всех сессий...
                                </>
                            ) : (
                                <>
                                    <LogOut className="w-5 h-5 mr-2"/>
                                    Завершить все сессии
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}