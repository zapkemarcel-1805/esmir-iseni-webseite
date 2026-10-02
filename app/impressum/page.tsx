import type { Metadata } from "next";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "Impressum – ESMIR ISENI",
};

export default function ImpressumPage() {
  return (
    <main className="container-page max-w-3xl py-20">
      <h1 className="font-display text-3xl font-semibold text-ink">
        Impressum
      </h1>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink/80">
        <div>
          <h2 className="font-semibold text-ink">
            Angaben gemäß § 5 DDG
          </h2>

          <p className="mt-2">
            {business.legalName}
            <br />
            Einzelunternehmen
            <br />
            {business.address.street}
            <br />
            {business.address.zip} {business.address.city}
            <br />
            Deutschland
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-ink">Kontakt</h2>

          <p className="mt-2">
            Telefon: {business.contact.phoneFormatted}
            <br />
            E-Mail:{" "}
            <a
              href={`mailto:${business.contact.email}`}
              className="text-gold hover:underline"
            >
              {business.contact.email}
            </a>
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
            Verbraucherstreitbeilegung
          </h2>

          <p className="mt-2">
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </div>
    </main>
  );
}