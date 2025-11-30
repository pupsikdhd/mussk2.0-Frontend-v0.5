'use client'
import { SessionResponse } from "@/logic/domain/api/response/Session";
import { Button } from "@/components/ui/button";
import { UAParser } from "ua-parser-js";
import { UseMutationResult } from "@tanstack/react-query";
import { ActionResult } from "@/logic/domain/services/results/Action";
import { motion } from "framer-motion";
import {
    Monitor,
    Smartphone,
    Laptop,
    Trash2,
    Globe,
    AlertTriangle,
    Clock,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";


function getDeviceIcon(userAgentString: string) {
    const parser = new UAParser(userAgentString);
    const deviceType = parser.getDevice().type;

    if (deviceType === 'mobile') return Smartphone;
    if (deviceType === 'tablet') return Smartphone;
    if (parser.getOS().name?.includes('Windows') || parser.getOS().name?.includes('Mac')) return Laptop;

    return Monitor;
}

function formatUserAgent(userAgentString: string): { display: string, icon: React.ElementType } {
    const parser = new UAParser(userAgentString);
    const browser = parser.getBrowser();
    const os = parser.getOS();

    const browserName = browser.name || "Неизвестный браузер";
    const browserVersion = browser.version ? browser.version.split(".")[0] : "";
    const osName = os.name || "Неизвестная OS";

    const display = `${browserName} ${browserVersion} на ${osName}`;

    return {
        display,
        icon: getDeviceIcon(userAgentString)
    };
}

// --- Компонент ---

interface Props {
    session: SessionResponse;
    terminate: UseMutationResult<ActionResult, Error, string>;
}

export default function SessionElement({ session, terminate }: Props) {
    const { display: deviceDisplay, icon: DeviceIcon } = formatUserAgent(session.userAgent);
    const isCurrent = session.thisDevice;
    const isTerminating = terminate.isPending && terminate.variables === session.publicId;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "flex justify-between items-center p-5 rounded-xl shadow-md transition-all duration-300 relative overflow-hidden",
                {
                    "bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-500 shadow-blue-300/30": isCurrent,
                    "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg": !isCurrent,
                    "opacity-50 pointer-events-none": terminate.isSuccess,
                }
            )}
        >
            <div className="flex items-center gap-4">
                <div
                    className={cn(
                        "p-3 rounded-full",
                        isCurrent ? "bg-blue-500 text-white shadow-lg" : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                    )}
                >
                    <DeviceIcon className="w-5 h-5" />
                </div>

                <div className="space-y-1 max-w-[70%]">
                    <div className="flex items-center gap-2">
                        {isCurrent && (
                            <Badge className="bg-blue-500 hover:bg-blue-500/90 text-white font-bold tracking-wider">
                                <Zap className="w-3 h-3 mr-1"/>
                                АКТИВНОЕ УСТРОЙСТВО
                            </Badge>
                        )}
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">ID: {session.publicId}</p>
                    </div>

                    <p className="text-lg font-bold text-gray-900 dark:text-gray-50">{deviceDisplay}</p>

                    <div className="text-sm text-neutral-600 dark:text-neutral-400 flex flex-wrap gap-x-4 gap-y-1">
                        <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3"/> IP: {session.ipAddress}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3"/> Начало: {session.startedAt}
                        </span>
                        <span className="flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-red-500"/> Истекает: {session.expiredAt}
                        </span>
                    </div>
                </div>
            </div>

            {!isCurrent && (
                <Button
                    variant="destructive"
                    className="rounded-lg h-9"
                    onClick={() => terminate.mutate(session.publicId)}
                    disabled={isTerminating || terminate.isSuccess}
                >
                    {isTerminating ? (
                        <>
                            <Zap className="w-4 h-4 mr-2 animate-spin"/>
                            Завершение...
                        </>
                    ) : (
                        <>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Завершить
                        </>
                    )}
                </Button>
            )}
        </motion.div>
    );
}