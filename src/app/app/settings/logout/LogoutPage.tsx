'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLogout } from "@/logic/hooks/Auth/useLogout"
import { Loader2, LogOut, ChevronLeft, CheckCircle, XCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
    const logout = useLogout()
    const router = useRouter();

    const handleStay = () => {
        router.back();
    }

    const isLoggingOut = logout.isPending;
    const isSuccess = logout.isSuccess;
    const isError = logout.isError;

    let cardContent;
    let cardFooter;

    if (isSuccess) {
        cardContent = (
            <div className="text-center text-green-600 dark:text-green-400 py-4">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-3 animate-pulse" />
                <p className="font-semibold text-lg">Выход выполнен успешно!</p>
                <p className="text-sm text-muted-foreground mt-1">Перенаправление на страницу входа...</p>
            </div>
        );
        cardFooter = (
            <Button className="mr-5 ml-5" onClick={() => router.push('/auth/signin')}>
                Перейти на страницу входа
            </Button>
        );

    } else if (isError) {
        // Ошибка выхода
        cardContent = (
            <div className="text-center text-red-600 dark:text-red-400 py-4">
                <XCircle className="mx-auto h-12 w-12 text-red-500 mb-3" />
                <p className="font-semibold text-lg">Произошла ошибка при выходе.</p>
                <p className="text-sm text-muted-foreground mt-1">Пожалуйста, попробуйте еще раз.</p>
            </div>
        );
        cardFooter = (
            <Button
                variant="destructive"
                onClick={() => logout.mutate()}
                className="w-full"
            >
                Повторить попытку
            </Button>
        );

    } else {
        cardContent = (
            <CardContent className="text-center text-gray-600 dark:text-gray-400 py-4">
                <p>Выйдя из аккаунта, вы завершите свою сессию на этом устройстве. </p>
                <p className="mt-2 text-sm italic">Вы сможете снова войти, когда захотите.</p>
            </CardContent>
        );
        cardFooter = (
            <CardFooter className="flex items-center justify-between gap-3 p-6 pt-0">
                <Button
                    variant="outline"
                    onClick={handleStay}
                    className="flex-1 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Нет, остаться
                </Button>

                <Button
                    variant="destructive"
                    onClick={() => logout.mutate()}
                    disabled={isLoggingOut}
                    className="flex-1 rounded-xl shadow-lg shadow-red-500/20"
                >
                    {isLoggingOut ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Выход...
                        </>
                    ) : (
                        <>
                            <LogOut className="mr-2 h-4 w-4" /> Да, выйти
                        </>
                    )}
                </Button>
            </CardFooter>
        );
    }


    return (
        <div className="flex h-screen w-full items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-sm"
            >
                <Card className="rounded-2xl shadow-2xl border-t-4">
                    <CardHeader className="pt-8 pb-4">
                        <div className="flex justify-center mb-4">
                            <LogOut className="h-10 w-10 text-red-500 dark:text-red-400" />
                        </div>
                        <CardTitle className="text-center text-2xl font-bold tracking-tight">
                            Подтвердите выход
                        </CardTitle>
                    </CardHeader>

                    {cardContent}
                    {cardFooter}

                </Card>
            </motion.div>
        </div>
    )
}