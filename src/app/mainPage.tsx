'use client'

import { Button } from "@/components/ui/button"
import { useAuth } from "@/logic/hooks/Auth/useAuth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function HomePage() {
    const router = useRouter()
    const { mutate: authMutate, isPending, data: result } = useAuth()

    useEffect(() => {
        authMutate()
    }, [authMutate])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <div className="max-w-3xl">
                <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                    Добро пожаловать в <span className="text-primary">MUSSK</span>
                </h1>
                <p className="mt-4 text-lg sm:text-xl">
                    Мгновенная связь. Быстрые чаты. Мощная система аккаунтов. Всё в одном месте.
                </p>
            </div>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                {isPending ? (
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : result?.status === 'success' ? (
                    <>
                        <Button
                            size="lg"
                            onClick={() => router.push('/app')}
                            className="px-10 text-lg"
                        >
                            Продолжить как {result.data.login}
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => router.push('/auth/signin')}
                            className="px-10 text-lg"
                        >
                            Войти в другой аккаунт
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            size="lg"
                            onClick={() => router.push('/auth/signin')}
                            className="px-10 text-lg"
                        >
                            Войти
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => router.push('/auth/signup')}
                            className="px-10 text-lg"
                        >
                            Создать аккаунт
                        </Button>
                    </>
                )}
            </div>

            <div className="mt-20 max-w-4xl text-muted-foreground">
                <p className="text-sm sm:text-base">
                    Надёжные чаты, продвинутая безопасность, быстрая работа — создаём платформу будущего.
                </p>
            </div>
        </div>
    )
}