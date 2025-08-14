import crypto from "node:crypto";

function deriveKeyFromSecret(secret: string): Buffer {
    // Use SHA-256 to derive a 32-byte key from an arbitrary length secret
    return crypto.createHash("sha256").update(secret).digest();
}

export function encryptSecret(plaintext: string, secret: string): string {
    const key = deriveKeyFromSecret(secret);
    const iv = crypto.randomBytes(12); // AES-GCM recommended IV size
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
    const authTag = cipher.getAuthTag();
    // Pack iv|authTag|ciphertext -> base64
    const payload = Buffer.concat([iv, authTag, ciphertext]).toString("base64");
    return payload;
}

export function decryptSecret(payloadBase64: string, secret: string): string {
    const key = deriveKeyFromSecret(secret);
    const raw = Buffer.from(payloadBase64, "base64");
    const iv = raw.subarray(0, 12);
    const authTag = raw.subarray(12, 28);
    const ciphertext = raw.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return plaintext.toString("utf8");
}

