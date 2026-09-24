import { NextRequest, NextResponse } from "next/server";
import { bookingRequestSchema } from "@/lib/validation";
import { createBookingRequest } from "@/lib/booking";
import {
  sendOwnerNotificationEmail,
  sendCustomerReceiptEmail,
} from "@/lib/email";
import { markEmailSent, markOwnerNotified } from "@/lib/booking";
import { isRateLimited } from "@/lib/rateLimit";
import { isAllowedBookingTime, isPastDate, isSunday } from "@/lib/time";

export async function POST(req: NextRequest) {
  try {
    // Rate limiting pro IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = bookingRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ungültige Eingabe", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Honeypot: Bots füllen versteckte Felder aus
    if (parsed.data.website) {
      return NextResponse.json({ success: true }); // Stiller Erfolg, keine echte Verarbeitung
    }

    if (isPastDate(parsed.data.requestedDate)) {
      return NextResponse.json(
        { error: "Das gewählte Datum liegt in der Vergangenheit." },
        { status: 400 }
      );
    }

    if (isSunday(parsed.data.requestedDate)) {
      return NextResponse.json(
        { error: "Sonntags ist geschlossen. Bitte wählen Sie Montag bis Samstag." },
        { status: 400 }
      );
    }

    if (!isAllowedBookingTime(parsed.data.requestedTime)) {
      return NextResponse.json(
        { error: "Bitte wählen Sie eine Uhrzeit zwischen 10:00 und 17:30 Uhr." },
        { status: 400 }
      );
    }

    const { booking, confirmToken, declineToken } = await createBookingRequest(
      parsed.data
    );

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
    const confirmUrl = `${baseUrl}/confirm/${confirmToken}`;
    const declineUrl = `${baseUrl}/decline/${declineToken}`;

    // E-Mail an den Inhaber (kritischer Pfad)
    const ownerResult = await sendOwnerNotificationEmail(
      booking,
      confirmUrl,
      declineUrl
    );
    if (ownerResult.success) {
      await markOwnerNotified(booking.id);
    } else {
      console.error(
        `WARNUNG: Inhaber-Benachrichtigung für Anfrage ${booking.id} fehlgeschlagen.`
      );
    }

    // Optionale Eingangsbestätigung an den Kunden (nicht kritisch für den Kern-Flow)
    const receiptResult = await sendCustomerReceiptEmail(booking);
    if (receiptResult.success) {
      await markEmailSent(booking.id, "receipt_email_sent");
    }

    return NextResponse.json({
      success: true,
      id: booking.id,
      ownerNotified: ownerResult.success,
    });
  } catch (err) {
    console.error("Fehler bei Terminanfrage:", err);
    return NextResponse.json(
      { error: "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut." },
      { status: 500 }
    );
  }
}
