'use client'
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import { Frown, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6 max-w-lg"
            >

                <hgroup>
                    <h1 className="text-8xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tighter">
                        404
                    </h1>
                    <h2 className="text-3xl font-semibold text-red-500 dark:text-red-400">
                        Страница не найдена
                    </h2>
                </hgroup>

                <p className="text-lg text-gray-600 dark:text-gray-400">
                    К сожалению, мы не смогли найти страницу по этому адресу. Возможно, она была перемещена или удалена.
                </p>

                <div className="flex justify-center space-x-4 pt-4">
                    <Button
                        variant="default"
                        className="rounded-xl px-6 py-3 text-lg shadow-md hover:shadow-lg"
                        onClick={() => router.push('/')}
                    >
                        На главную
                    </Button>
                    <Button
                        variant="outline"
                        className="rounded-xl px-6 py-3 text-lg"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Назад
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}