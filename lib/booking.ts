import { getSupabaseAdmin } from "./supabase";
import {
  generateRawToken,
  hashToken,
  tokenExpiryDate,
} from "./tokens";
import { BookingRequestInput } from "./validation";
import { BookingRequestRecord } from "./types";

/**
 * Legt eine neue Terminanfrage in der Datenbank an (Status: PENDING)
 * und erzeugt die beiden rohen Tokens für Bestätigung/Ablehnung.
 * Die rohen Tokens werden zurückgegeben, damit sie EINMALIG per E-Mail
 * versendet werden können — gespeichert wird nur ihr Hash.
 */
export async function createBookingRequest(input: BookingRequestInput) {
  const supabase = getSupabaseAdmin();

  const confirmRaw = generateRawToken();
  const declineRaw = generateRawToken();
  const expiresAt = tokenExpiryDate();

  const { data, error } = await supabase
    .from("booking_requests")
    .insert({
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      phone: input.phone,
      service: input.service,
      requested_date: input.requestedDate,
      requested_time: input.requestedTime,
      vehicle: input.vehicle ?? null,
      message: input.message ?? null,
      status: "PENDING",
      confirm_token_hash: hashToken(confirmRaw),
      decline_token_hash: hashToken(declineRaw),
      token_expires_at: expiresAt.toISOString(),
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Anfrage konnte nicht gespeichert werden: ${error?.message}`);
  }

  return {
    booking: data as BookingRequestRecord,
    confirmToken: confirmRaw,
    declineToken: declineRaw,
  };
}

export type TokenLookupResult =
  | { state: "valid"; booking: BookingRequestRecord }
  | { state: "not_found" }
  | { state: "expired"; booking: BookingRequestRecord }
  | { state: "already_decided"; booking: BookingRequestRecord };

async function lookupByHash(
  hash: string,
  column: "confirm_token_hash" | "decline_token_hash"
): Promise<TokenLookupResult> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("booking_requests")
    .select("*")
    .eq(column, hash)
    .maybeSingle();

  if (error || !data) return { state: "not_found" };

  const booking = data as BookingRequestRecord;

  if (booking.status !== "PENDING") {
    return { state: "already_decided", booking };
  }
  if (new Date(booking.token_expires_at).getTime() < Date.now()) {
    return { state: "expired", booking };
  }
  return { state: "valid", booking };
}

export async function lookupByConfirmToken(rawToken: string) {
  return lookupByHash(hashToken(rawToken), "confirm_token_hash");
}

export async function lookupByDeclineToken(rawToken: string) {
  return lookupByHash(hashToken(rawToken), "decline_token_hash");
}

/**
 * Bestätigt einen Termin ATOMAR: das UPDATE ist an status='PENDING' und den
 * exakten Token-Hash sowie ein nicht abgelaufenes Ablaufdatum gebunden.
 * Wird gleichzeitig zweimal ausgeführt (z.B. Doppelklick), kann nur einer
 * der beiden Aufrufe die Zeile tatsächlich ändern — Postgres serialisiert
 * das UPDATE row-level, RETURNING liefert dann nur beim Gewinner eine Zeile.
 */
export async function confirmBookingAtomic(
  rawToken: string
): Promise<{ success: boolean; booking: BookingRequestRecord | null }> {
  const supabase = getSupabaseAdmin();
  const hash = hashToken(rawToken);

  const { data, error } = await supabase
    .from("booking_requests")
    .update({
      status: "CONFIRMED",
      decided_at: new Date().toISOString(),
    })
    .eq("confirm_token_hash", hash)
    .eq("status", "PENDING")
    .gte("token_expires_at", new Date().toISOString())
    .select()
    .maybeSingle();

  if (error || !data) return { success: false, booking: null };
  return { success: true, booking: data as BookingRequestRecord };
}

export async function declineBookingAtomic(
  rawToken: string
): Promise<{ success: boolean; booking: BookingRequestRecord | null }> {
  const supabase = getSupabaseAdmin();
  const hash = hashToken(rawToken);

  const { data, error } = await supabase
    .from("booking_requests")
    .update({
      status: "DECLINED",
      decided_at: new Date().toISOString(),
    })
    .eq("decline_token_hash", hash)
    .eq("status", "PENDING")
    .gte("token_expires_at", new Date().toISOString())
    .select()
    .maybeSingle();

  if (error || !data) return { success: false, booking: null };
  return { success: true, booking: data as BookingRequestRecord };
}

export async function markEmailSent(
  bookingId: string,
  field: "confirm_email_sent" | "decline_email_sent" | "receipt_email_sent"
) {
  const supabase = getSupabaseAdmin();
  await supabase
    .from("booking_requests")
    .update({ [field]: true })
    .eq("id", bookingId);
}

export async function markOwnerNotified(bookingId: string) {
  const supabase = getSupabaseAdmin();
  await supabase
    .from("booking_requests")
    .update({ owner_notified_at: new Date().toISOString() })
    .eq("id", bookingId);
}
