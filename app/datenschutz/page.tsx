import type { Metadata } from "next";
import { business } from "@/config/business";

export const metadata: Metadata = { title: "Datenschutzerklärung – ESMIR ISENI" };

function Missing({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gold/20 px-1 text-ink">
      [Noch zu ergänzen: {children}]
    </span>
  );
}

export default function DatenschutzPage() {
  return (
    <main className="container-page max-w-3xl py-20">
      <h1 className="font-display text-3xl font-semibold text-ink">
        Datenschutzerklärung
      </h1>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink/80">
        <p className="border border-ink/10 bg-ink/[0.02] p-4 text-xs text-ink/50">
          Diese Datenschutzerklärung ist eine Vorbereitung. Sie muss nach der
          tatsächlichen technischen Umsetzung (verwendete Dienste, Hosting,
          Datenbank, E-Mail-Versand) rechtlich geprüft und vervollständigt
          werden, bevor die Webseite veröffentlicht wird.
        </p>

        <div>
          <h2 className="font-semibold text-ink">1. Verantwortlicher</h2>
          <p className="mt-2">
            {business.legalName}
            <br />
            {business.address.street}
            <br />
            {business.address.zip} {business.address.city}
            <br />
            E-Mail: {business.contact.email}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-ink">
            2. Verarbeitung im Rahmen des Terminanfrageformulars
          </h2>
          <p className="mt-2">
            Wenn Sie über das Terminanfrageformular eine Anfrage stellen,
            verarbeiten wir die von Ihnen angegebenen personenbezogenen
            Daten (Name, E-Mail-Adresse, Telefonnummer, gewünschte
            Dienstleistung, Wunschtermin sowie ggf. Fahrzeugdaten und Ihre
            Nachricht), um Ihre Anfrage zu bearbeiten und mit Ihnen in
            Kontakt zu treten.
          </p>
          <p className="mt-2">
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines
            Vertrags) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse an der Kommunikation mit Interessenten).
          </p>
          <p className="mt-2">
            Die Daten werden in einer Datenbank bei{" "}
            <Missing>
              genauer Name und Sitz des Datenbankanbieters (z. B. Supabase, inkl.
              Serverstandort)
            </Missing>{" "}
            gespeichert.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-ink">3. Versand von E-Mails</h2>
          <p className="mt-2">
            Zur Benachrichtigung über Ihre Terminanfrage sowie zur
            Übersendung der Terminbestätigung oder -absage nutzen wir den
            E-Mail-Dienst{" "}
            <Missing>
              genauer Name und Sitz des E-Mail-Dienstleisters (z. B. Resend,
              inkl. Serverstandort und ggf. Auftragsverarbeitungsvertrag)
            </Missing>
            .
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-ink">4. Speicherdauer</h2>
          <p className="mt-2">
            <Missing>
              Konkrete Speicher- und Löschfristen für Terminanfragen festlegen
              (z. B. Löschung X Monate nach Bearbeitung, sofern keine
              gesetzlichen Aufbewahrungspflichten entgegenstehen)
            </Missing>
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-ink">5. Ihre Rechte</h2>
          <p className="mt-2">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit sowie
            Widerspruch gegen die Verarbeitung Ihrer personenbezogenen
            Daten. Wenden Sie sich hierzu an {business.contact.email}.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-ink">6. Hosting</h2>
          <p className="mt-2">
            Diese Webseite wird gehostet bei{" "}
            <Missing>
              genauer Hosting-Anbieter (z. B. Vercel, inkl. Serverstandort)
            </Missing>
            .
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-ink">7. Cookies / Tracking</h2>
          <p className="mt-2">
            <Missing>
              Angabe ergänzen, sobald feststeht, ob und welche Cookies,
              Analyse- oder Tracking-Dienste eingesetzt werden
            </Missing>
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-ink">8. Beschwerderecht</h2>
          <p className="mt-2">
            Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde
            über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu
            beschweren.
          </p>
        </div>
      </div>
    </main>
  );
}
