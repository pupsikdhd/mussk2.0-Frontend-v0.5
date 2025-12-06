'use client';
import { useRouter } from "next/navigation";
import { FormEvent, useState, useMemo } from "react";
import { useLogin } from "@/logic/hooks/Auth/useLogin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TurnstileCaptcha from "@/components/Turnstile";
import { motion } from "framer-motion";
import Link from "next/link";
import RotatingText from "@/components/AnimatedText";
import {toast} from "react-toastify";

export default function LoginForm() {
    const router = useRouter();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");

    const { mutate: loginMutate, isPending, data: result } = useLogin();

    const isFormValid = useMemo(() => {
        const areFieldsFilled = login.length > 0 && password.length > 0;
        const isCaptchaPassed = captchaToken.length > 0;

        return areFieldsFilled && isCaptchaPassed;
    }, [login, password, captchaToken]);


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

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

    const buttonText = isPending ? "Проверка..." : "Войти";

    return (
        <div className="flex flex-col min-h-screen items-center justify-between bg-black text-white px-4 sm:px-8 py-10 sm:py-16 font-geist">
            <motion.main
                className="flex flex-col items-center gap-10 flex-grow justify-center text-center w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.h1
                    className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                        <RotatingText
                            texts={['Добро пожаловать', 'Рады видеть', 'Добрый день']}
                            mainClassName="text-3xl sm:text-4xl font-bold tracking-tight px-2 py-1"
                            staggerFrom="last"
                            initial={{y: "100%"}}
                            animate={{y: 0}}
                            exit={{y: "-120%"}}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{type: "spring", damping: 30, stiffness: 400}}
                            rotationInterval={2000}
                        />
                    👋
                </motion.h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 w-full bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20"
                >
                    <div className="grid gap-2 text-left">
                        <label className="text-sm font-medium text-white/80">Логин</label>
                        <Input
                            placeholder="Введите логин"
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            disabled={isPending}
                            className="bg-white/10 border border-white/20 focus:border-cyan-400 text-white placeholder-white/60 hover:bg-white/20 rounded-xl transition-colors"
                        />
                    </div>

                    {/* Пароль */}
                    <div className="grid gap-2 text-left">
                        <label className="text-sm font-medium text-white/80">Пароль</label>
                        <Input
                            placeholder="Введите пароль"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isPending}
                            className="bg-white/10 border border-white/20 focus:border-cyan-400 text-white placeholder-white/60 hover:bg-white/20 rounded-xl transition-colors"
                        />
                    </div>

                    <div>
                        <TurnstileCaptcha onChange={setCaptchaToken} />
                    </div>

                    <Button
                        type="submit"
                        disabled={!isFormValid || isPending}
                        className={'text-lg p-5'}
                    >
                        {buttonText}
                    </Button>
                    <div className="text-center mt-4">
                        <span className="text-sm text-white/70">
                            Нет аккаунта?{" "}
                            <Link href="/auth/signup" className="underline font-semibold hover:text-gray-200 transition-colors">
                                Создать
                            </Link>
                        </span>
                    </div>

                </form>
            </motion.main>
        </div>
    );
}