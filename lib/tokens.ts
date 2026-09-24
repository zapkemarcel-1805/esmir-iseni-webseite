import { randomBytes, createHash, timingSafeEqual } from "crypto";

/**
 * Erzeugt ein kryptografisch sicheres, URL-taugliches Token (roh).
 * Dieses rohe Token wird NUR einmal per E-Mail-Link versendet und niemals
 * in der Datenbank gespeichert — gespeichert wird ausschließlich der Hash.
 */
export function generateRawToken(): string {
  return randomBytes(32).toString("base64url");
}

/**
 * Erzeugt einen SHA-256 Hash eines Tokens zur sicheren Speicherung in der DB.
 * Ein Leak der Datenbank erlaubt damit keine Rückrechnung des gültigen Tokens.
 */
export function hashToken(rawToken: string): string {
  return createHash("sha256").update(rawToken).digest("hex");
}

/**
 * Konstante-Zeit-Vergleich zweier Hashes, um Timing-Angriffe zu verhindern.
 */
export function safeCompareHash(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "hex");
  const bufB = Buffer.from(b, "hex");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Gültigkeitsdauer eines Bestätigungs-/Ablehnungslinks in Stunden. */
export const TOKEN_TTL_HOURS = 72;

export function tokenExpiryDate(): Date {
  const d = new Date();
  d.setHours(d.getHours() + TOKEN_TTL_HOURS);
  return d;
}
