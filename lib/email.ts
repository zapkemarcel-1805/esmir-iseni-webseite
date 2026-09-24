import { Resend } from "resend";
import { business } from "@/config/business";
import { BookingRequestRecord } from "./types";
import { formatDateDE } from "./time";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY ist nicht gesetzt. Bitte in .env.local konfigurieren."
    );
  }
  return new Resend(key);
}

const FROM_ADDRESS =
  process.env.EMAIL_FROM || "ESMIR ISENI <onboarding@resend.dev>";
const OWNER_EMAIL = process.env.OWNER_NOTIFICATION_EMAIL || business.contact.email;

/**
 * Sendet eine E-Mail mit bis zu 3 Versuchen (exponentielles Backoff),
 * damit ein vorübergehender Fehler beim E-Mail-Dienst nicht zum stillen
 * Verlust einer Nachricht führt. Gibt zurück, ob der Versand am Ende
 * erfolgreich war.
 */
async function sendWithRetry(payload: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<{ success: boolean; error?: string }> {
  const resend = getResend();
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const { error } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
        reply_to: payload.replyTo,
      });
      if (error) {
        lastError = error;
      } else {
        return { success: true };
      }
    } catch (err) {
      lastError = err;
    }
    // Backoff vor erneutem Versuch (nicht nach dem letzten Versuch)
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, attempt * 500));
    }
  }

  console.error("E-Mail-Versand endgültig fehlgeschlagen:", lastError);
  return { success: false, error: String(lastError) };
}

function wrapEmailHtml(innerHtml: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:32px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">
          <tr>
            <td style="background-color:#111111;padding:28px 32px;text-align:center;">
              <div style="color:#D4AF65;font-size:22px;font-weight:bold;letter-spacing:1px;">ESMIR ISENI</div>
              <div style="color:#C0C0C0;font-size:11px;letter-spacing:2px;margin-top:4px;">AUTOVERMIETUNG&nbsp;|&nbsp;AUTOPFLEGE&nbsp;|&nbsp;AN &amp; VERKAUF</div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:#1D1D1D;font-size:15px;line-height:1.6;">
              ${innerHtml}
            </td>
          </tr>
          <tr>
            <td style="background-color:#1D1D1D;padding:20px 32px;text-align:center;color:#C0C0C0;font-size:12px;">
              ${business.name} · ${business.address.street}, ${business.address.zip} ${business.address.city}<br/>
              Tel: ${business.contact.phoneFormatted} · ${business.contact.email}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function serviceLabel(service: string): string {
  const map: Record<string, string> = {
    sportwagenvermietung: "Sportwagenvermietung",
    autoaufbereitung: "Autoaufbereitung",
    fahrzeugankauf: "Fahrzeugankauf",
    fahrzeugverkauf: "Fahrzeugverkauf",
  };
  return map[service] ?? service;
}

function vehicleBlockHtml(booking: BookingRequestRecord): string {
  if (!booking.vehicle) return "";
  const v = booking.vehicle;
  const rows = [
    v.brand && `Marke: ${v.brand}`,
    v.model && `Modell: ${v.model}`,
    v.year && `Baujahr: ${v.year}`,
    v.mileage && `Kilometerstand: ${v.mileage}`,
    v.price && `Preis: ${v.price}`,
    v.condition && `Zustand: ${v.condition}`,
  ].filter(Boolean);
  if (rows.length === 0) return "";
  return `<div style="margin-top:12px;padding:12px 16px;background:#f7f5f0;border-left:3px solid #D4AF65;">
    <strong>Fahrzeugdaten</strong><br/>${rows.join("<br/>")}
  </div>`;
}

/** Schritt 2: Benachrichtigung an den Inhaber mit Bestätigen/Ablehnen-Links */
export async function sendOwnerNotificationEmail(
  booking: BookingRequestRecord,
  confirmUrl: string,
  declineUrl: string
) {
  const subject = `Neue Terminanfrage – ESMIR ISENI – ${serviceLabel(
    booking.service
  )}`;

  const html = wrapEmailHtml(`
    <h2 style="color:#111111;margin-top:0;">Neue Terminanfrage</h2>
    <p><strong>Name:</strong> ${booking.first_name} ${booking.last_name}<br/>
    <strong>E-Mail:</strong> ${booking.email}<br/>
    <strong>Telefon:</strong> ${booking.phone}<br/>
    <strong>Dienstleistung:</strong> ${serviceLabel(booking.service)}<br/>
    <strong>Wunschdatum:</strong> ${formatDateDE(booking.requested_date)}<br/>
    <strong>Wunschuhrzeit:</strong> ${booking.requested_time} Uhr</p>
    ${vehicleBlockHtml(booking)}
    ${
      booking.message
        ? `<div style="margin-top:12px;"><strong>Nachricht:</strong><br/>${booking.message}</div>`
        : ""
    }
    <p style="margin-top:8px;color:#777;font-size:13px;">Anfrage-ID: ${booking.id}</p>
    <div style="margin-top:28px;text-align:center;">
      <a href="${confirmUrl}" style="display:inline-block;background-color:#D4AF65;color:#111111;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:6px;margin:6px;">TERMIN BESTÄTIGEN</a>
      <a href="${declineUrl}" style="display:inline-block;background-color:#1D1D1D;color:#F0D38D;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:6px;margin:6px;border:1px solid #D4AF65;">TERMIN ABLEHNEN</a>
    </div>
    <p style="margin-top:20px;font-size:13px;color:#777;">
      Die Links öffnen eine sichere Bestätigungsseite. Der Termin wird erst verbindlich,
      wenn Sie dort aktiv bestätigen. Der Link ist 72 Stunden gültig.
    </p>
  `);

  const text = `Neue Terminanfrage – ${serviceLabel(booking.service)}

Name: ${booking.first_name} ${booking.last_name}
E-Mail: ${booking.email}
Telefon: ${booking.phone}
Dienstleistung: ${serviceLabel(booking.service)}
Wunschdatum: ${formatDateDE(booking.requested_date)}
Wunschuhrzeit: ${booking.requested_time} Uhr
Anfrage-ID: ${booking.id}

Bestätigen: ${confirmUrl}
Ablehnen: ${declineUrl}`;

  return sendWithRetry({
    to: OWNER_EMAIL,
    subject,
    html,
    text,
    replyTo: booking.email,
  });
}

/** Schritt 6: Eingangsbestätigung an den Kunden (unverbindlich) */
export async function sendCustomerReceiptEmail(booking: BookingRequestRecord) {
  const subject = "Wir haben Ihre Terminanfrage erhalten – ESMIR ISENI";
  const html = wrapEmailHtml(`
    <p>Guten Tag ${booking.first_name},</p>
    <p>vielen Dank für Ihre Terminanfrage!</p>
    <p>Wir haben Ihre Anfrage erhalten und prüfen den gewünschten Termin:</p>
    <p><strong>Dienstleistung:</strong> ${serviceLabel(booking.service)}<br/>
    <strong>Datum:</strong> ${formatDateDE(booking.requested_date)}<br/>
    <strong>Uhrzeit:</strong> ${booking.requested_time} Uhr</p>
    <p>Sie erhalten eine weitere E-Mail, sobald wir Ihren Termin persönlich bestätigt
    oder Ihre Anfrage beantwortet haben.</p>
    <p style="padding:12px 16px;background:#f7f5f0;border-left:3px solid #D4AF65;">
    Bitte beachten Sie: Ihr Termin ist noch <strong>nicht verbindlich bestätigt</strong>.</p>
    <p>Ihr ESMIR ISENI Team</p>
  `);
  const text = `Guten Tag ${booking.first_name},

vielen Dank für Ihre Terminanfrage! Wir haben Ihre Anfrage erhalten und prüfen den gewünschten Termin.
Sie erhalten eine weitere E-Mail, sobald wir Ihren Termin persönlich bestätigt oder Ihre Anfrage beantwortet haben.

Bitte beachten Sie: Ihr Termin ist noch nicht verbindlich bestätigt.

Ihr ESMIR ISENI Team`;

  return sendWithRetry({ to: booking.email, subject, html, text });
}

/** Schritt 4: Verbindliche Terminbestätigung an den Kunden */
export async function sendCustomerConfirmedEmail(booking: BookingRequestRecord) {
  const subject = "Ihr Termin wurde bestätigt – ESMIR ISENI";
  const html = wrapEmailHtml(`
    <p>Guten Tag ${booking.first_name},</p>
    <p>vielen Dank für Ihre Anfrage. Wir bestätigen Ihnen hiermit folgenden Termin:</p>
    <p style="padding:12px 16px;background:#f7f5f0;border-left:3px solid #D4AF65;">
    <strong>Dienstleistung:</strong> ${serviceLabel(booking.service)}<br/>
    <strong>Datum:</strong> ${formatDateDE(booking.requested_date)}<br/>
    <strong>Uhrzeit:</strong> ${booking.requested_time} Uhr</p>
    <p><strong>Adresse:</strong><br/>
    ${business.name}<br/>
    ${business.address.street}<br/>
    ${business.address.zip} ${business.address.city}</p>
    <p>Bei Fragen erreichen Sie uns telefonisch unter ${business.contact.phoneFormatted}.</p>
    <p>Wir freuen uns auf Sie!</p>
    <p>Ihr ESMIR ISENI Team</p>
  `);
  const text = `Guten Tag ${booking.first_name},

vielen Dank für Ihre Anfrage.

Wir bestätigen Ihnen hiermit folgenden Termin:
Dienstleistung: ${serviceLabel(booking.service)}
Datum: ${formatDateDE(booking.requested_date)}
Uhrzeit: ${booking.requested_time}

Adresse:
${business.name}
${business.address.street}
${business.address.zip} ${business.address.city}

Bei Fragen erreichen Sie uns telefonisch unter ${business.contact.phoneFormatted}.

Wir freuen uns auf Sie!
Ihr ESMIR ISENI Team`;

  return sendWithRetry({ to: booking.email, subject, html, text });
}

/** Schritt 5: Absage an den Kunden */
export async function sendCustomerDeclinedEmail(booking: BookingRequestRecord) {
  const subject = "Rückmeldung zu Ihrer Terminanfrage – ESMIR ISENI";
  const html = wrapEmailHtml(`
    <p>Guten Tag ${booking.first_name},</p>
    <p>vielen Dank für Ihre Terminanfrage.</p>
    <p>Leider können wir Ihren gewünschten Termin nicht bestätigen.</p>
    <p>Gerne können Sie uns eine neue Terminanfrage senden oder telefonisch unter
    ${business.contact.phoneFormatted} kontaktieren.</p>
    <p>Vielen Dank für Ihr Verständnis.</p>
    <p>Ihr ESMIR ISENI Team</p>
  `);
  const text = `Guten Tag ${booking.first_name},

vielen Dank für Ihre Terminanfrage.

Leider können wir Ihren gewünschten Termin nicht bestätigen.

Gerne können Sie uns eine neue Terminanfrage senden oder telefonisch unter ${business.contact.phoneFormatted} kontaktieren.

Vielen Dank für Ihr Verständnis.
Ihr ESMIR ISENI Team`;

  return sendWithRetry({ to: booking.email, subject, html, text });
}
