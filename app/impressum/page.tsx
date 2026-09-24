import type { Metadata } from "next";
import { business } from "@/config/business";

export const metadata: Metadata = { title: "Impressum – ESMIR ISENI" };

function Missing({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gold/20 px-1 text-ink">
      [Noch zu ergänzen: {children}]
    </span>
  );
}

export default function ImpressumPage() {
  return (
    <main className="container-page max-w-3xl py-20">
      <h1 className="font-display text-3xl font-semibold text-ink">
        Impressum
      </h1>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink/80">
        <div>
          <h2 className="font-semibold text-ink">Angaben gemäß § 5 TMG</h2>
          <p className="mt-2">
            {business.legalName}
            <br />
            {business.address.street}
            <br />
            {business.address.zip} {business.address.city}
          </p>
          <p className="mt-2">
            <Missing>
              Rechtsform (z. B. Einzelunternehmen) und ggf. Handelsregistereintrag
            </Missing>
          </p>
          <p className="mt-2">
            <Missing>Umsatzsteuer-Identifikationsnummer, falls vorhanden</Missing>
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-ink">Kontakt</h2>
          <p className="mt-2">
            Telefon: {business.contact.phoneFormatted}
            <br />
            E-Mail: {business.contact.email}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-ink">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p className="mt-2">
            {business.legalName}
            <br />
            {business.address.street}
            <br />
            {business.address.zip} {business.address.city}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-ink">
            EU-Streitschlichtung
          </h2>
          <p className="mt-2">
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              className="text-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            . <Missing>Angabe der eigenen E-Mail-Adresse hier ergänzen, falls gewünscht</Missing>
          </p>
          <p className="mt-2">
            <Missing>
              Angabe zur Teilnahme/Nichtteilnahme an einem
              Streitschlichtungsverfahren vor einer Verbraucherschlichtungsstelle
            </Missing>
          </p>
        </div>

        <p className="border border-ink/10 bg-ink/[0.02] p-4 text-xs text-ink/50">
          Hinweis: Dieses Impressum ist eine Vorbereitung und muss vor
          Veröffentlichung der Webseite rechtlich geprüft und um alle
          erforderlichen Pflichtangaben ergänzt werden. Es werden hier
          bewusst keine erfundenen rechtlichen Angaben dargestellt.
        </p>
      </div>
    </main>
  );
}
