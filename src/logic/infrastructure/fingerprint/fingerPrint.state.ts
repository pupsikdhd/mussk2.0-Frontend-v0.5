//infrastructure/fingerprint/fingerprint.state.ts
import { injectable } from "tsyringe";
import {useFingerprintStore} from "@/logic/store/FingerprintStore";

@injectable()
export class FingerPrintState {
    private fpPromise: Promise<any> | null = null;

    private async loadFingerprintJS() {
        const FingerprintJS = await import("@fingerprintjs/fingerprintjs");

        return FingerprintJS.load();
    }

    async get(): Promise<string> {
        if (!this.fpPromise) {
            this.fpPromise = this.loadFingerprintJS();
        }

        const store = useFingerprintStore.getState();
        if (store.fingerprint) {
            return store.fingerprint;
        }

        const fp = await this.fpPromise;
        const result = await fp.get();
        store.setFingerprint(result.visitorId);

        return result.visitorId;
    }
}