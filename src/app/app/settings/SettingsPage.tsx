'use client'
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {ArrowRight, Lock, Palette, User, KeyRound, Globe, Fingerprint, Key} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";


export default function SettingsPage() {
    const [tab, setTab] = useState<"security" | "custom">("security");

    return (
        <div className="w-full flex justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">

                <Card className="w-full lg:w-72 h-fit sticky top-12 p-5 shadow-2xl rounded-xl bg-white dark:bg-[#171717] border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-gray-50 flex items-center gap-2">
                        <Lock className="w-5 h-5"/> Настройки
                    </h2>
                    <Separator className="mb-2 bg-gray-200 dark:bg-gray-700" />

                    <div className="space-y-1">
                        <SidebarButton
                            label="Безопасность"
                            icon={Lock}
                            active={tab === "security"}
                            onClick={() => setTab("security")}
                        />
                        <SidebarButton
                            label="Кастомизация"
                            icon={Palette}
                            active={tab === "custom"}
                            onClick={() => setTab("custom")}
                        />
                    </div>
                </Card>

                <motion.div
                    key={tab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex-1 space-y-6"
                >
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">
                        {tab === "security" ? "Параметры безопасности" : "Персонализация и вид"}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Управляйте доступом, паролями и внешним видом вашего аккаунта.
                    </p>

                    {tab === "security" && <SecurityTab />}
                    {tab === "custom" && <CustomizationTab />}
                </motion.div>
            </div>
        </div>
    );
}


function SidebarButton({ label, active, onClick, icon: Icon }: { label: string; active?: boolean; onClick: () => void; icon: React.ElementType }) {
    return (
        <Button
            variant={active ? "default" : "ghost"}
            className={cn(
                "w-full justify-start rounded-lg text-left mb-1 py-3 transition-colors duration-200",
                active ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
            onClick={onClick}
        >
            <Icon className="w-5 h-5 mr-3" />
            <span className={cn(active && "font-semibold")}>{label}</span>
        </Button>
    );
}

function Section({ title, description, url, icon: Icon, status }: { title: string; description: string; url: string; icon: React.ElementType; status?: string }) {
    return (
        <Link href={url} className="block group">
            <Card className="p-6 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-xl rounded-xl cursor-pointer bg-white dark:bg-[#171717] border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="p-3 mr-4 rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-gray-50">{title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {status && (
                            <Badge variant={status === "Включено" ? "default" : "secondary"}>
                                {status}
                            </Badge>
                        )}
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-all duration-200" />
                    </div>
                </div>
            </Card>
        </Link>
    );
}


function SecurityTab() {
    return (
        <div className="space-y-4">
            <Section
                title="Активные сессии"
                description="Просмотр и управление устройствами, с которых выполнен вход."
                url={"/app/settings/sessions"}
                icon={Fingerprint}
            />
            <Section
                title="Двухфакторная аутентификация (2FA)"
                description="Добавьте дополнительный уровень защиты к вашему аккаунту."
                url={"/app/settings/totp"}
                icon={KeyRound}
            />
            <Section
                title="Смена пароля"
                description="Регулярно меняйте свой пароль для обеспечения безопасности."
                url={"/app/settings/password"}
                icon={Lock}
            />
            <Section
                title="Настройки приватности"
                description="Управляйте, кто может видеть вашу информацию и как она используется."
                url={"/app/settings/privacy"}
                icon={Globe}
            />
            <Section
                title="Управление ключом"
                description="Управляйте, ключом шифрования сообщений"
                url={"/app/settings/key"}
                icon={Key}
            />
        </div>
    );
}

function CustomizationTab() {
    return (
        <div className="space-y-4">
            <Section
                title="Профиль и информация"
                description="Редактируйте имя, аватар и публичную информацию."
                url={"/app/settings/profile"}
                icon={User}
            />
        </div>
    );
}