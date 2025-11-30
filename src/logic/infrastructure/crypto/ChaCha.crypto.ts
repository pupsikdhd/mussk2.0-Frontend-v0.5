
import { randomBytes } from "@stablelib/random";
import {ChaCha20Poly1305, NONCE_LENGTH} from "@stablelib/chacha20poly1305";
import {concat} from "@stablelib/bytes";


export class CryptoService {

    constructor() {
    }

    generateRandomKey(): Uint8Array {
        return randomBytes(32);
    }

    async encrypt(plaintext:string, key: string) {
        const keyBytes = typeof key === "string" ? this.hexToBytes(key) : key;
        if (keyBytes.length !== 32) throw new Error("Key must be 32 bytes");


        const nonce = randomBytes(NONCE_LENGTH);

        const cipher = new ChaCha20Poly1305(keyBytes);

        const plaintextBytes = new TextEncoder().encode(plaintext);

        const sealed = cipher.seal(nonce, plaintextBytes);

        const result = concat(nonce, sealed);

        return this.bytesToHex(result);
    }

    async decrypt(sealedHex:string, key:string) {
        const keyBytes = typeof key === "string" ? this.hexToBytes(key) : key;
        if (keyBytes.length !== 32) throw new Error("Key must be 32 bytes");


        const combinedBytes = this.hexToBytes(sealedHex);

        const nonce = combinedBytes.slice(0, NONCE_LENGTH);

        const sealed = combinedBytes.slice(NONCE_LENGTH);

        if (combinedBytes.length < NONCE_LENGTH + 16) {
            return null;
        }

        const cipher = new ChaCha20Poly1305(keyBytes);

        const plaintextBytes = cipher.open(nonce, sealed);

        if (plaintextBytes === null) {
            return null;
        }

        return new TextDecoder().decode(plaintextBytes);
    }


    hexToBytes(hex: string): Uint8Array {
        if (hex.length % 2 !== 0) throw new Error("Invalid hex string");
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
        }
        return bytes;
    }

    bytesToHex(bytes: Uint8Array): string {
        return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
    }


}
