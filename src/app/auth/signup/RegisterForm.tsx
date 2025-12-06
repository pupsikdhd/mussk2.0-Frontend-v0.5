'use client';

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useRegister } from "@/logic/hooks/Auth/useRegister";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

import { motion } from "framer-motion";
import RotatingText from "@/components/AnimatedText";
import {Loader} from "@/components/ui/loader";



const showToast = (message: string, type: 'error' | 'success') => {
    toast[type](message, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
    });
};

export default function SignUp() {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isAccepted, setIsAccepted] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    const router = useRouter();
    const register = useRegister();

    useEffect(() => {
        if (register.isSuccess) {
            showToast("Аккаунт успешно создан!", "success");
            router.push('/app');
        }
    }, [register.isSuccess, router]);

    useEffect(() => {
        if (register.isError) {
            const message = register.error?.message || "Непредвиденная ошибка регистрации.";
            showToast(message, "error");
        }
    }, [register.isError, register.error]);


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if(!login || !password || !confirmPassword) {
            setLocalError("Пожалуйста, заполните все поля.");
            return;
        }
        if (!isAccepted) {
            setLocalError("Вы должны принять условия использования.");
            return;
        }
        if (password.length < 8) {
            setLocalError("Минимальная длина пароля 8 знаков.");
            return;
        }
        if (password !== confirmPassword) {
            setLocalError("Пароли не совпадают.");
            return;
        }

        register.mutate({ login, password });
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-between bg-[#000000] text-white px-4 sm:px-8 py-10 sm:py-16 font-geist">
            <motion.main
                className="flex flex-col items-center gap-10 flex-grow justify-center text-center w-full max-w-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >

                <motion.h1
                    className="text-3xl sm:text-4xl font-bold tracking-tight"
                    initial={{scale: 0.95, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{delay: 0.2}}
                >
                    <p className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-2">
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
                    </p>
                </motion.h1>

                <form
                    className="flex mb-10 flex-col gap-6 w-full bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg"
                    onSubmit={handleSubmit}
                >
                    <div className="grid gap-2 text-left">
                        <h1 className="flex items-center gap-2 text-white">
                             Логин
                        </h1>
                        <Input
                            id="login"
                            type="text"
                            placeholder="Введите логин"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            className="bg-white/20 border-white/30 focus:border-cyan-400 text-white placeholder-white/60"
                        />
                    </div>

                    {/* Поле Пароль */}
                    <div className="grid gap-2 text-left">
                        <h1 className="flex items-center gap-2 text-white">
                            Пароль
                        </h1>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white/20 border-white/30 focus:border-cyan-400 text-white placeholder-white/60"
                        />
                    </div>

                    {/* Поле Повторите пароль */}
                    <div className="grid gap-2 text-left">
                        <h1 className="flex items-center gap-2 text-white">
                            Повторите пароль
                        </h1>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Повторите пароль"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-white/20 border-white/30 focus:border-cyan-400 text-white placeholder-white/60"
                        />
                    </div>

                    {/* Checkbox */}
                    <h1
                        className="flex items-start gap-3 rounded-md bg-white/5 p-3 border border-white/20 hover:bg-white/10 transition-colors cursor-pointer">
                        <Checkbox
                            checked={isAccepted}
                            onCheckedChange={(e) => setIsAccepted(!isAccepted)}
                            className="border-white data-[state=checked]:bg-cyan-500"
                        />
                        <div>
                            <p className="text-sm leading-tight font-medium text-white">
                                Согласен с{" "}
                                <Link href={'/privacy'} className="underline text-cyan-300 hover:text-cyan-400">
                                    условиями
                                </Link>
                            </p>
                        </div>
                    </h1>

                    {/* Отображение локальной ошибки (для валидации) или ошибки хука */}
                    {(localError || register.isError) && (
                        <p className="text-red-400 text-sm">
                            {localError || (register.error?.message || "Неизвестная ошибка сети")}
                        </p>
                    )}


                    <Button
                        type="submit"
                        // Используем состояние загрузки из хука
                        disabled={register.isPending || !isAccepted}
                        className="text-base sm:text-lg px-6 mt-2"
                    >
                        {/* Используем состояние загрузки из хука */}
                        {register.isPending ? <Loader/> : "Создать"}
                    </Button>

                    {/* Ссылка на вход */}
                    <p className="text-sm text-white/60">
                        Уже есть аккаунт?{" "}
                        <Link
                            href={'/auth/signin'}
                            className="underline hover:text-white transition-colors"
                        >
                            Войти
                        </Link>
                    </p>
                </form>


            </motion.main>

        </div>
    );
}