/**
 * Einfaches In-Memory-Rate-Limiting pro IP-Adresse.
 * Ausreichend für eine einzelne Serverless-Instanz / kleines Aufkommen.
 * Für höheres Aufkommen empfiehlt sich Upstash Redis o.ä. (austauschbar,
 * da diese Funktion isoliert ist).
 */
const WINDOW_MS = 10 * 60 * 1000; // 10 Minuten
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(identifier) ?? []).filter(
    (t) => now - t < WINDOW_MS
  );
  timestamps.push(now);
  hits.set(identifier, timestamps);
  return timestamps.length > MAX_REQUESTS;
}
