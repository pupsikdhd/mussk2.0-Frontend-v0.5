// stores/fingerprintStore.ts
'use client'
import { create } from "zustand";

interface FingerprintState {
    fingerprint: string | null;
    setFingerprint: (fp: string) => void;
}

export const useFingerprintStore = create<FingerprintState>((set) => ({
    fingerprint: null,
    setFingerprint: (fp) => set({ fingerprint: fp }),
}));
