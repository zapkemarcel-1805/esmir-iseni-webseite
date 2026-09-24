import { lookupByDeclineToken } from "@/lib/booking";
import { formatDateDE } from "@/lib/time";
import DeclineActionClient from "@/components/DeclineActionClient";

export const metadata = {
  title: "Termin ablehnen – ESMIR ISENI",
  robots: { index: false, follow: false },
};

const serviceLabels: Record<string, string> = {
  sportwagenvermietung: "Sportwagenvermietung",
  autoaufbereitung: "Autoaufbereitung",
  fahrzeugankauf: "Fahrzeugankauf",
  fahrzeugverkauf: "Fahrzeugverkauf",
};

export default async function DeclinePage({
  params,
}: {
  params: { token: string };
}) {
  const result = await lookupByDeclineToken(params.token);

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-16">
      <div className="mb-8 text-center">
        <div className="text-sm font-semibold tracking-widest2 text-gold">
          ESMIR ISENI
        </div>
        <h1 className="mt-2 text-2xl font-semibold text-ink">
          Terminanfrage ablehnen
        </h1>
      </div>

      {result.state === "not_found" && (
        <p className="rounded-lg border border-red-300 bg-red-50 p-6 text-center text-red-800">
          Dieser Link ist ungültig.
        </p>
      )}

      {result.state === "already_decided" && (
        <p className="rounded-lg border border-ink/20 bg-ink/5 p-6 text-center text-ink">
          Diese Anfrage wurde bereits bearbeitet (Status: {result.booking.status}).
        </p>
      )}

      {result.state === "expired" && (
        <p className="rounded-lg border border-ink/20 bg-ink/5 p-6 text-center text-ink">
          Dieser Link ist abgelaufen.
        </p>
      )}

      {result.state === "valid" && (
        <div className="space-y-6">
          <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink/60">Kunde</dt>
                <dd className="font-medium text-ink">
                  {result.booking.first_name} {result.booking.last_name}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Dienstleistung</dt>
                <dd className="font-medium text-ink">
                  {serviceLabels[result.booking.service]}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Datum</dt>
                <dd className="font-medium text-ink">
                  {formatDateDE(result.booking.requested_date)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Uhrzeit</dt>
                <dd className="font-medium text-ink">
                  {result.booking.requested_time} Uhr
                </dd>
              </div>
            </dl>
          </div>

          <DeclineActionClient token={params.token} />
        </div>
      )}
    </main>
  );
}
