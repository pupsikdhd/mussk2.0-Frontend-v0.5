'use client'

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useContinueWithTOTP } from "@/logic/hooks/Auth/useTOTP";
import { useRouter, useSearchParams } from "next/navigation";
import {toast} from "react-toastify";

export default function TOTPForm() {
    const [code, setCode] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const totpChallenge = searchParams.get("id") ?? "";

    const { mutateAsync, isPending } = useContinueWithTOTP();

    async function handleSubmit() {
        if (code.length !== 6) return;

        const result = await mutateAsync({
            totpCode: code,
            totpChallenge,
            rememberMe
        });

        if (result.status === "success") {
            router.push("/app");
        } else {
            toast.error("Неверный код")
            console.warn("Неверный код");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm p-8 rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">

                <h1 className="text-2xl font-semibold mb-2 text-center">
                    Подтверждение входа
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-center mb-6">
                    Введите 6-значный код из приложения аутентификации
                </p>

                <div className="flex justify-center mb-4">
                    <InputOTP
                        maxLength={6}
                        inputMode="numeric"
                        pattern={REGEXP_ONLY_DIGITS}
                        value={code}
                        onChange={setCode}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                {/* Remember me */}
                <label className="flex items-center gap-2 cursor-pointer select-none mb-6">
                    <Checkbox
                        checked={rememberMe}
                        onCheckedChange={(v) => setRememberMe(Boolean(v))}
                    />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        Запомнить устройство
                    </span>
                </label>

                <Button
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={isPending || code.length !== 6}
                >
                    {isPending ? "Проверяем..." : "Войти"}
                </Button>

            </div>
        </div>
    );
}
