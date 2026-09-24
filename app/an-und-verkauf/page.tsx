import Link from "next/link";
import type { Metadata } from "next";
import { SaleVehicleGrid } from "@/components/VehicleGrid";
import { saleVehicles } from "@/config/vehicles";
import { HandshakeIcon, KeyIcon, ShieldIcon, CarIcon } from "@/components/icons";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "Auto An- & Verkauf in Gummersbach – ESMIR ISENI",
  description:
    "Fahrzeugankauf und Fahrzeugverkauf in Gummersbach. Fahrzeug unverbindlich anbieten oder aktuelle Verkaufsfahrzeuge entdecken – persönlich, fair und transparent.",
};

const ankaufSchritte = [
  {
    step: "01",
    title: "Fahrzeugdaten senden",
    text: "Marke, Modell, Baujahr, Kilometerstand, Zustand und Ihre Preisvorstellung helfen uns bei der ersten Einschätzung.",
  },
  {
    step: "02",
    title: "Persönlich abstimmen",
    text: "Wir melden uns bei Ihnen zurück und klären offene Fragen sowie das weitere Vorgehen.",
  },
  {
    step: "03",
    title: "Fahrzeug ansehen",
    text: "Für eine seriöse Einschätzung kann eine Besichtigung vor Ort vereinbart werden. Erst danach wird über die nächsten Schritte gesprochen.",
  },
];

const ankaufDaten = [
  "Marke & Modell",
  "Baujahr",
  "Kilometerstand",
  "Zustand des Fahrzeugs",
  "Gewünschter Verkaufspreis",
  "Zusätzliche Informationen",
];

const werte = [
  {
    icon: <HandshakeIcon />,
    title: "Persönlicher Kontakt",
    text: "Keine anonyme Massenabwicklung: Rückfragen, Besichtigung und weitere Schritte werden direkt mit Ihnen abgestimmt.",
  },
  {
    icon: <ShieldIcon />,
    title: "Transparentes Vorgehen",
    text: "Sie wissen, welcher Schritt als Nächstes kommt. Eine Anfrage ist zunächst unverbindlich und verpflichtet Sie zu keinem Verkauf.",
  },
  {
    icon: <CarIcon />,
    title: "Fahrzeug im Mittelpunkt",
    text: "Für eine vernünftige Einschätzung zählen die tatsächlichen Fahrzeugdaten und der Zustand – nicht nur ein pauschaler Online-Wert.",
  },
];

const faq = [
  {
    q: "Ist meine Fahrzeuganfrage verbindlich?",
    a: "Nein. Die Anfrage dient zunächst dazu, die wichtigsten Fahrzeugdaten zu übermitteln und Kontakt aufzunehmen. Ein Verkauf kommt erst zustande, wenn beide Seiten sich ausdrücklich einigen.",
  },
  {
    q: "Welche Angaben sollte ich zum Fahrzeug machen?",
    a: "Hilfreich sind Marke, Modell, Baujahr, Kilometerstand, Zustand und eine Preisvorstellung. Weitere Details können Sie im Nachrichtenfeld ergänzen.",
  },
  {
    q: "Kann ich mein Fahrzeug auch ohne Preisvorstellung anbieten?",
    a: "Sie können uns zunächst die Fahrzeugdaten senden und Ihre Situation im Nachrichtenfeld beschreiben. Die weiteren Punkte lassen sich anschließend persönlich besprechen.",
  },
  {
    q: "Wo sehe ich aktuelle Verkaufsfahrzeuge?",
    a: "Verfügbare Fahrzeuge werden auf dieser Seite veröffentlicht, sobald Angebote online sind. Wenn aktuell nichts gelistet ist, können Sie uns gerne direkt nach dem aktuellen Stand fragen.",
  },
];

export default function AnUndVerkaufPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgba(212,175,101,0.2),transparent_38%)]" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <span className="eyebrow">Auto An- &amp; Verkauf · Gummersbach</span>
            <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
              AUTO AN- &amp; VERKAUF
            </h1>
            <p className="mt-5 text-xl text-white">Fair. Transparent. Sicher.</p>
            <p className="mt-4 max-w-xl leading-relaxed text-silver/75">
              Sie möchten Ihr Fahrzeug anbieten oder interessieren sich für ein
              Fahrzeug aus unserem Verkauf? Bei uns steht der persönliche
              Kontakt im Vordergrund – von der ersten Anfrage bis zum nächsten
              Schritt.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/termin-buchen?service=fahrzeugankauf"
                className="btn-gold"
              >
                Fahrzeug anbieten
              </Link>
              <a href="#verkauf" className="btn-outline">
                Verkaufsfahrzeuge
              </a>
            </div>
          </div>

          <div className="border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Fahrzeugankauf
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold">
              Die wichtigsten Daten reichen für den ersten Kontakt.
            </h2>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {ankaufDaten.map((item) => (
                <div
                  key={item}
                  className="border border-white/10 bg-black/20 px-4 py-3 text-sm text-silver/80"
                >
                  <span className="mr-2 text-gold">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <div className="text-gold">
              <HandshakeIcon className="h-10 w-10" />
            </div>
            <span className="eyebrow mt-6 block">Fahrzeugankauf</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Fahrzeug verkaufen – unkompliziert anfragen.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-ink/65">
              Senden Sie uns die wichtigsten Daten zu Ihrem Fahrzeug. Wir
              schauen uns Ihre Angaben an und melden uns persönlich zurück. Eine
              Anfrage ist unverbindlich und noch kein Verkauf.
            </p>
            <Link
              href="/termin-buchen?service=fahrzeugankauf"
              className="mt-8 inline-block rounded-sm bg-ink px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-gold hover:text-ink"
            >
              Fahrzeug jetzt anbieten
            </Link>
          </div>

          <div className="grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-3">
            {ankaufSchritte.map((item) => (
              <article key={item.step} className="bg-white p-6 sm:p-7">
                <span className="font-display text-3xl font-semibold text-gold">
                  {item.step}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink/[0.025] py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="eyebrow">Unser Ansatz</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Klarer Ablauf statt unnötiger Versprechen.
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              Beim Fahrzeughandel zählen nachvollziehbare Informationen,
              persönlicher Kontakt und ein sauber abgestimmter Ablauf. Genau das
              soll sich auch auf unserer Webseite widerspiegeln.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {werte.map((item) => (
              <article
                key={item.title}
                className="border border-ink/10 bg-white p-7"
              >
                <div className="text-gold">{item.icon}</div>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="verkauf" className="bg-anthracite py-20 text-white sm:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <div className="text-gold">
                <KeyIcon className="h-10 w-10" />
              </div>
              <span className="eyebrow mt-6 block">Fahrzeugverkauf</span>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Aktuelle Fahrzeuge im Verkauf.
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-silver/75">
                Sobald Fahrzeuge verfügbar sind, erscheinen sie hier mit den
                wichtigsten Daten, Bildern und einer direkten
                Anfrage-Möglichkeit.
              </p>
            </div>

            {saleVehicles.length === 0 && (
              <div className="border border-gold/25 bg-black/20 p-6 sm:p-8">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Aktuell keine Fahrzeuge online
                </span>
                <p className="mt-3 text-sm leading-relaxed text-silver/75">
                  Derzeit ist kein Verkaufsfahrzeug auf der Webseite
                  veröffentlicht. Für aktuelle Informationen können Sie uns
                  direkt kontaktieren.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={business.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                  >
                    Per WhatsApp fragen
                  </a>
                  <Link
                    href="/termin-buchen?service=fahrzeugverkauf"
                    className="btn-outline"
                  >
                    Fahrzeuganfrage senden
                  </Link>
                </div>
              </div>
            )}
          </div>

          {saleVehicles.length > 0 && (
            <div className="mt-12">
              <SaleVehicleGrid vehicles={saleVehicles} />
            </div>
          )}
        </div>
      </section>

      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="eyebrow">Häufige Fragen</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Fragen rund um An- &amp; Verkauf.
            </h2>
          </div>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium text-ink">
                  {item.q}
                  <span className="text-xl font-light text-gold transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pt-3 text-sm leading-relaxed text-ink/60">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-center text-white">
        <div className="container-page">
          <span className="eyebrow">Direkt anfragen</span>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Möchten Sie ein Fahrzeug anbieten?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-silver/75">
            Senden Sie uns die wichtigsten Fahrzeugdaten. Wir prüfen Ihre
            Anfrage und melden uns persönlich bei Ihnen zurück.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/termin-buchen?service=fahrzeugankauf"
              className="btn-gold"
            >
              Fahrzeug anbieten
            </Link>
            <a
              href={business.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              WhatsApp öffnen
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
