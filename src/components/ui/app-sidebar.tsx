'use client'
import { MessagesSquare, Settings, User, LogOut, ChevronLeft, Zap } from "lucide-react" // Добавим иконки для дизайна
import Link from "next/link"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRouter, usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"


interface SidebarItem {
    title: string;
    url: string;
    icon: React.ElementType;
}

const mainItems: SidebarItem[] = [
    {
        title: "Чаты",
        url: "/app",
        icon: MessagesSquare,
    },
]

const bottomItems: SidebarItem[] = [
    {
        title: "Профиль",
        url: "/app/profile",
        icon: User,
    },
    {
        title: "Настройки",
        url: "/app/settings",
        icon: Settings,
    },
]


export function AppSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        console.log("Пользователь выходит...");
        router.push('/app/settings/logout');
    }

    return (
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Sidebar>
                <SidebarContent>

                    <div className="flex items-center justify-between p-4 mb-4">
                        <Link href="/app/chats" className="flex items-center space-x-2 text-xl font-bold text-primary dark:text-white">
                            <Zap className="w-6 h-6" />
                            <span>MUSSK</span>
                        </Link>
                    </div>

                    <Separator className="mb-4" />

                    <SidebarGroup>
                        <SidebarGroupLabel className="uppercase text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400">
                            Главное
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {mainItems.map((item) => (
                                    <StyledSidebarItem
                                        key={item.title}
                                        item={item}
                                        pathname={pathname}
                                    />
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                        <SidebarGroup>
                            <SidebarGroupLabel className="uppercase text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400">
                                Аккаунт
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {bottomItems.map((item) => (
                                        <StyledSidebarItem
                                            key={item.title}
                                            item={item}
                                            pathname={pathname}
                                        />
                                    ))}

                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 hover:text-red-700 w-full justify-start"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="w-5 h-5" />
                                            <span>Выход</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                    </div>
                </SidebarContent>
            </Sidebar>
        </motion.div>
    )
}


function StyledSidebarItem({ item, pathname }: { item: SidebarItem, pathname: string | null }) {
    const isActive = pathname === item.url;

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Link
                    href={item.url}
                    className={
                        isActive
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-md"
                            : "text-gray-700 dark:text-gray-300"
                    }
                >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
