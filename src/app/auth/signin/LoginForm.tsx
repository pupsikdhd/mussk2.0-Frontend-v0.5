"use client"
import { useRouter } from "next/navigation";
import {FormEvent, useState} from "react";
import { useLogin } from "@/logic/hooks/Auth/useLogin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TurnstileCaptcha from "@/components/Turnstile";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
    const router = useRouter();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");

    const {
        mutate: loginMutate,
        isPending,
        data: result,
    } = useLogin();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        loginMutate({ login, password, captchaToken });
    };

    if (result) {
        if (result.status === "success") {
            router.push("/app");
            return null;
        }
        if (result.status === "mfa") {
            router.push(`/auth/totp?id=${result.token}`);
            return null;
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-sm"
            >
                <Card className="backdrop-blur-xl bg-white/10 shadow-2xl rounded-2xl border border-white/20">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-semibold">Вход</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                placeholder="Логин"
                                type="text"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                disabled={isPending}
                                className="rounded-xl focus:ring-2"
                            />

                            <Input
                                placeholder="Пароль"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isPending}
                                className="rounded-xl focus:ring-2"
                            />

                            <div className="flex justify-center">
                                <TurnstileCaptcha onChange={setCaptchaToken} />
                            </div>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full h-11 rounded-xl text-base font-medium"
                            >
                                {isPending ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="animate-spin" /> Проверка...
                                    </div>
                                ) : (
                                    "Войти"
                                )}
                            </Button>

                            {result?.status === "unauthorized" && (
                                <p className="text-sm text-red-500 text-center">
                                    Неверный логин или пароль.
                                </p>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
