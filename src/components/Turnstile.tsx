'use client'
import { useEffect, useRef } from "react";
import {appConfig} from "@/logic/configs/appConfig";


declare global {
    interface Window {
        turnstile: {
            render: (container: string | HTMLElement, options: TurnstileOptions) => string;
            reset: (widgetIdOrContainer: string | HTMLElement) => void;
            remove: (widgetIdOrContainer: string | HTMLElement) => void;
        };
    }
}

interface TurnstileOptions {
    sitekey: string;
    callback: (token: string) => void;
    'error-callback'?: (errorCode: string) => void;
    theme?: 'light' | 'dark' | 'auto';
    action?: string;
    cData?: string;
    retry?: 'auto' | 'never';
}

interface Props {
    onChange: (token: string) => void;
    className?: string;
}

const TURNSTILE_SITE_KEY: string = appConfig.turnstileSiteKey;

export default function TurnstileCaptcha({ onChange, className }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetId = useRef<string | undefined>(undefined);

    useEffect(() => {
        const renderCaptcha = () => {
            if (!containerRef.current || !window.turnstile || widgetId.current) return;

            widgetId.current = window.turnstile.render(containerRef.current, {
                sitekey: TURNSTILE_SITE_KEY,
                callback: (token) => onChange(token),
                theme: 'auto',
            });
        };

        const scriptId = 'cf-turnstile-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
            script.async = true;
            script.defer = true;
            script.id = scriptId;
            script.onload = renderCaptcha;
            document.head.appendChild(script);
        } else if (window.turnstile) {
            renderCaptcha();
        }

        return () => {
            if (widgetId.current && window.turnstile) {
                window.turnstile.remove(widgetId.current);
            }
        };
    }, [onChange]);

    return <div ref={containerRef} className={className}></div>;
}
