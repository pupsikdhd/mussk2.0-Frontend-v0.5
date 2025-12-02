//@ts-ignore
"use client";

import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
    HTMLAttributes,
} from "react";
import { motion, AnimatePresence, Transition, MotionProps, HTMLMotionProps } from "framer-motion";
import "../../../../OneDrive/Рабочий стол/projects/hlam/MUSSK-frontend/src/components/ui/RotatingText.css";

function cn(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

type StaggerFrom = "first" | "last" | "center" | "random";

interface RotatingTextProps extends HTMLAttributes<HTMLSpanElement> {
    texts?: string[];
    transition?: Transition;
    initial?: MotionProps["initial"];
    animate?: MotionProps["animate"];
    exit?: MotionProps["exit"];
    animatePresenceMode?: "wait" | "sync" | "popLayout";
    animatePresenceInitial?: boolean;
    rotationInterval?: number;
    staggerDuration?: number;
    staggerFrom?: StaggerFrom;
    loop?: boolean;
    auto?: boolean;
    splitBy?: string; // "characters" | "words" | "lines" | any string
    onNext?: (index: number) => void;
    mainClassName?: string;
    splitLevelClassName?: string;
    elementLevelClassName?: string;
}

export interface RotatingTextRef {
    next: () => void;
    previous: () => void;
    jumpTo: (index: number) => void;
    reset: () => void;
}

interface ElementObj {
    characters: string[];
    needsSpace: boolean;
}
//@ts-ignore
const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(function RotatingText(
    {
        texts = ["Default text"],
        transition = { type: "spring", damping: 25, stiffness: 300 },
        initial = { y: "100%", opacity: 0 },
        animate = { y: 0, opacity: 1 },
        exit = { y: "-120%", opacity: 0 },
        animatePresenceMode = "wait",
        animatePresenceInitial = false,
        rotationInterval = 2000,
        staggerDuration = 0,
        staggerFrom = "first",
        loop = true,
        auto = true,
        splitBy = "characters",
        onNext,
        mainClassName,
        splitLevelClassName,
        elementLevelClassName,
        ...rest
    }: RotatingTextProps & Omit<HTMLMotionProps<"span">, "ref">,
    ref
) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const splitIntoCharacters = (text: string) => {
        if (typeof Intl !== "undefined" && Intl.Segmenter) {
            const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
            return Array.from(segmenter.segment(text), (s) => s.segment);
        }
        return Array.from(text);
    };

    const elements: ElementObj[] = useMemo(() => {
        const currentText = texts[currentTextIndex] || "";
        if (splitBy === "characters") {
            return currentText.split(" ").map((word, i, arr) => ({
                characters: splitIntoCharacters(word),
                needsSpace: i !== arr.length - 1,
            }));
        }
        if (splitBy === "words") {
            return currentText.split(" ").map((word, i, arr) => ({
                characters: [word],
                needsSpace: i !== arr.length - 1,
            }));
        }
        if (splitBy === "lines") {
            return currentText.split("\n").map((line, i, arr) => ({
                characters: [line],
                needsSpace: i !== arr.length - 1,
            }));
        }
        return currentText.split(splitBy).map((part, i, arr) => ({
            characters: [part],
            needsSpace: i !== arr.length - 1,
        }));
    }, [texts, currentTextIndex, splitBy]);

    const getStaggerDelay = useCallback(
        (index: number, total: number) => {
            switch (staggerFrom) {
                case "first":
                    return index * staggerDuration;
                case "last":
                    return (total - 1 - index) * staggerDuration;
                case "center": {
                    const center = Math.floor(total / 2);
                    return Math.abs(center - index) * staggerDuration;
                }
                case "random":
                    return Math.random() * total * staggerDuration;
                default:
                    return index * staggerDuration;
            }
        },
        [staggerDuration, staggerFrom]
    );

    const next = useCallback(() => {
        const nextIndex =
            currentTextIndex >= texts.length - 1
                ? loop
                    ? 0
                    : currentTextIndex
                : currentTextIndex + 1;

        if (nextIndex !== currentTextIndex) {
            setCurrentTextIndex(nextIndex);
            onNext?.(nextIndex);
        }
    }, [currentTextIndex, texts.length, loop, onNext]);

    const previous = useCallback(() => {
        const prevIndex =
            currentTextIndex <= 0
                ? loop
                    ? texts.length - 1
                    : 0
                : currentTextIndex - 1;

        if (prevIndex !== currentTextIndex) {
            setCurrentTextIndex(prevIndex);
            onNext?.(prevIndex);
        }
    }, [currentTextIndex, texts.length, loop, onNext]);

    const jumpTo = useCallback(
        (index: number) => {
            const valid = Math.max(0, Math.min(index, texts.length - 1));
            if (valid !== currentTextIndex) {
                setCurrentTextIndex(valid);
                onNext?.(valid);
            }
        },
        [currentTextIndex, texts.length, onNext]
    );

    const reset = useCallback(() => jumpTo(0), [jumpTo]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }));

    useEffect(() => {
        if (!auto) return;
        const id = setInterval(next, rotationInterval);
        return () => clearInterval(id);
    }, [next, rotationInterval, auto]);

    return (
        <motion.span
            className={cn("text-rotate", mainClassName)}
            {...rest}
            layout
            transition={transition}
        >
            <span className="sr-only">{texts[currentTextIndex]}</span>

            <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
                <motion.span
                    key={currentTextIndex}
                    className={splitBy === "lines" ? "text-rotate-lines" : "text-rotate"}
                    aria-hidden="true"
                >
                    {elements.map((wordObj, wordIndex, wordArray) => {
                        const allCharsCount = wordArray.reduce(
                            (sum, w) => sum + w.characters.length,
                            0
                        );
                        const prevChars = wordArray
                            .slice(0, wordIndex)
                            .reduce((sum, w) => sum + w.characters.length, 0);

                        return (
                            <span
                                key={wordIndex}
                                className={cn("text-rotate-word", splitLevelClassName)}
                            >
                                {wordObj.characters.map((char, charIndex) => (
                                    <motion.span
                                        key={charIndex}
                                        initial={initial}
                                        animate={animate}
                                        exit={exit}
                                        transition={{
                                            ...transition,
                                            delay: getStaggerDelay(prevChars + charIndex, allCharsCount),
                                        }}
                                        className={cn("text-rotate-element", elementLevelClassName)}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
                            </span>
                        );
                    })}
                </motion.span>
            </AnimatePresence>
        </motion.span>
    );
});

export default RotatingText;
