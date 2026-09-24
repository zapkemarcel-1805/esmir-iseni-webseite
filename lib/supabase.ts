import { createClient } from "@supabase/supabase-js";

/**
 * Server-seitiger Supabase-Client mit dem Service-Role-Key.
 * NIEMALS in Client-Komponenten importieren — nur in API-Routen (app/api/**)
 * und Server Components verwenden, da der Service-Role-Key volle DB-Rechte hat.
 */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase ist nicht konfiguriert. Bitte SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY in .env.local setzen."
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
