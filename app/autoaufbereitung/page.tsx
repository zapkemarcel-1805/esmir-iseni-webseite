import Link from "next/link";
import type { Metadata } from "next";
import {
  CarIcon,
  SparkleCarIcon,
  DropletIcon,
  ShieldIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Professionelle Autoaufbereitung in Gummersbach – ESMIR ISENI",
  description:
    "Professionelle Autoaufbereitung in Gummersbach: Innenraumreinigung, Außenpflege, Lackpflege und komplette Fahrzeugaufbereitung. Unverbindlich Termin anfragen.",
};

const leistungen = [
  {
    icon: <CarIcon />,
    title: "Innenraumreinigung",
    text: "Sorgfältige Reinigung von Sitzen, Polstern, Verkleidungen und gut erreichbaren Innenraumflächen – abgestimmt auf Fahrzeug und Zustand.",
  },
  {
    icon: <SparkleCarIcon />,
    title: "Außenreinigung",
    text: "Gründliche Reinigung und Pflege der Außenflächen für einen sauberen, gepflegten Gesamteindruck.",
  },
  {
    icon: <DropletIcon />,
    title: "Lackpflege",
    text: "Pflege des Fahrzeuglacks mit Blick auf Glanz, Sauberkeit und ein stimmiges Finish – der genaue Umfang wird vorab besprochen.",
  },
  {
    icon: <ShieldIcon />,
    title: "Komplettaufbereitung",
    text: "Innen und außen aus einer Hand. Ideal, wenn das Fahrzeug insgesamt sichtbar aufgefrischt und gepflegt werden soll.",
  },
];

const gruende = [
  {
    label: "ALLTAG & SAISON",
    title: "Frischer Auftritt im Alltag",
    text: "Wenn sich Schmutz, Staub und Gebrauchsspuren gesammelt haben, bringt eine gründliche Aufbereitung wieder mehr Ordnung und Pflege ins Fahrzeug.",
  },
  {
    label: "FAHRZEUGVERKAUF",
    title: "Gut vorbereitet präsentieren",
    text: "Ein gepflegtes Fahrzeug macht bei Besichtigung und Verkauf einen deutlich besseren ersten Eindruck. Umfang und Ziel besprechen wir vorher gemeinsam.",
  },
  {
    label: "PFLEGE & WERTERHALT",
    title: "Regelmäßig gepflegt statt nur schnell sauber",
    text: "Regelmäßige Pflege hilft dabei, Innenraum und Außenflächen dauerhaft in einem gepflegten Zustand zu halten.",
  },
];

const ablauf = [
  {
    step: "01",
    title: "Anfrage senden",
    text: "Sie schicken uns Ihre Kontaktdaten, Fahrzeugangaben und Ihren gewünschten Termin.",
  },
  {
    step: "02",
    title: "Umfang abstimmen",
    text: "Wir klären persönlich, welche Bereiche aufbereitet werden sollen und was für Ihr Fahrzeug sinnvoll ist.",
  },
  {
    step: "03",
    title: "Termin bestätigen",
    text: "Nach Prüfung erhalten Sie eine persönliche Terminbestätigung. Erst dann ist der Termin verbindlich.",
  },
  {
    step: "04",
    title: "Aufbereitung & Übergabe",
    text: "Zum vereinbarten Termin wird das Fahrzeug aufbereitet und anschließend wieder an Sie übergeben.",
  },
];

const faq = [
  {
    q: "Wie lange dauert eine Autoaufbereitung?",
    a: "Das hängt vom Fahrzeug, dem Zustand und dem gewünschten Leistungsumfang ab. Die voraussichtliche Dauer stimmen wir vor dem Termin mit Ihnen ab.",
  },
  {
    q: "Was kostet eine Aufbereitung?",
    a: "Der Preis richtet sich nach Fahrzeuggröße, Zustand und gewünschtem Umfang. Deshalb wird die Leistung individuell besprochen, bevor ein Termin verbindlich bestätigt wird.",
  },
  {
    q: "Kann ich nur den Innenraum oder nur außen aufbereiten lassen?",
    a: "Ja. Die Anfrage kann sich auf einzelne Bereiche oder auf eine komplette Aufbereitung beziehen. Schreiben Sie Ihren Wunsch einfach in die Terminanfrage.",
  },
  {
    q: "Wie läuft die Terminbuchung ab?",
    a: "Sie senden zunächst eine unverbindliche Anfrage. Wir prüfen den gewünschten Termin und bestätigen ihn anschließend persönlich per E-Mail.",
  },
];

export default function AutoaufbereitungPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgba(212,175,101,0.2),transparent_38%)]" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <span className="eyebrow">Autoaufbereitung · Gummersbach</span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
              PROFESSIONELLE AUTOAUFBEREITUNG
            </h1>
            <p className="mt-5 max-w-xl text-xl text-white">
              Innen &amp; außen. Professionell. Gründlich. Glänzend.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-silver/75">
              Von der gezielten Innenraumreinigung bis zur kompletten
              Fahrzeugaufbereitung: Wir stimmen den Umfang auf Ihr Fahrzeug und
              Ihren Bedarf ab – persönlich und ohne unnötige Pakete von der
              Stange.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/termin-buchen?service=autoaufbereitung"
                className="btn-gold"
              >
                Aufbereitungstermin anfragen
              </Link>
              <a href="#leistungen" className="btn-outline">
                Leistungen ansehen
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 border border-white/10 bg-white/[0.03] p-4 sm:gap-4 sm:p-6">
            {leistungen.map((leistung) => (
              <div
                key={leistung.title}
                className="min-h-36 border border-white/10 bg-black/20 p-5"
              >
                <div className="text-gold">{leistung.icon}</div>
                <p className="mt-5 font-display text-sm font-semibold text-white sm:text-base">
                  {leistung.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="leistungen" className="container-page py-20 sm:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Leistungsbereiche</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Pflege, die zu Ihrem Fahrzeug passt.
          </h2>
          <p className="mt-4 leading-relaxed text-ink/65">
            Nicht jedes Fahrzeug braucht dasselbe. Deshalb wird der tatsächliche
            Umfang vor dem Termin abgestimmt und passend zum Zustand des
            Fahrzeugs festgelegt.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {leistungen.map((l, index) => (
            <article
              key={l.title}
              className="group border border-ink/10 bg-white p-6 transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-black/5"
            >
              <div className="flex items-center justify-between">
                <div className="text-gold">{l.icon}</div>
                <span className="font-display text-xs font-semibold text-ink/25">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                {l.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                {l.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-anthracite py-20 text-white sm:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="eyebrow">Wann lohnt es sich?</span>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Mehr als nur einmal durch die Waschanlage.
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-silver/75">
                Eine Aufbereitung ist besonders dann interessant, wenn das
                Fahrzeug bewusst gepflegt, für einen Verkauf vorbereitet oder
                nach intensiver Nutzung wieder gründlich aufgefrischt werden
                soll.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {gruende.map((grund) => (
                <article
                  key={grund.title}
                  className="border border-white/10 bg-white/[0.035] p-6"
                >
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-gold">
                    {grund.label}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {grund.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-silver/70">
                    {grund.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="eyebrow">Einblick in unsere Arbeit</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Autoaufbereitung in Bewegung.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-ink/65">
              Ein echter Einblick aus unserem Arbeitsalltag: sorgfältige
              Fahrzeugpflege, saubere Details und ein hochwertiger Gesamteindruck.
              Weitere Vorher-Nachher-Aufnahmen und Referenzen ergänzen wir nach
              und nach mit echten Kundenfahrzeugen.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/50">
              Sie haben bereits ein konkretes Fahrzeug? Senden Sie uns bei Ihrer
              Anfrage kurz Modell, Zustand und gewünschten Umfang – wir melden
              uns persönlich zurück.
            </p>
          </div>

          <div className="relative overflow-hidden border border-ink/10 bg-ink p-4 text-white sm:p-6">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative mx-auto max-w-sm overflow-hidden border border-white/10 bg-black shadow-2xl shadow-black/20">
              <video
                className="aspect-[9/16] h-auto w-full object-cover"
                src="/videos/autoaufbereitung.mp4"
                controls
                muted
                playsInline
                preload="metadata"
                aria-label="Video einer Autoaufbereitung bei ESMIR ISENI"
              >
                Ihr Browser unterstützt die Videowiedergabe nicht.
              </video>
            </div>
            <p className="relative mt-4 text-center text-xs uppercase tracking-[0.18em] text-gold">
              ESMIR ISENI · AUTOAUFBEREITUNG
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink/[0.025] py-20 sm:py-24">
        <div className="container-page">
          <span className="eyebrow">So läuft es ab</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Von der Anfrage bis zur Fahrzeugübergabe.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-4">
            {ablauf.map((a) => (
              <article key={a.step} className="bg-white p-6 sm:p-7">
                <span className="font-display text-3xl font-semibold text-gold">
                  {a.step}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {a.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="eyebrow">Häufige Fragen</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Vor dem Termin gut informiert.
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
          <span className="eyebrow">Autoaufbereitung anfragen</span>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Ihr Fahrzeug verdient einen gepflegten Auftritt.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-silver/75">
            Senden Sie uns Ihre unverbindliche Anfrage. Wir besprechen den
            gewünschten Umfang, prüfen den Termin und melden uns persönlich bei
            Ihnen zurück.
          </p>
          <Link
            href="/termin-buchen?service=autoaufbereitung"
            className="btn-gold mt-8 inline-block"
          >
            Aufbereitungstermin anfragen
          </Link>
        </div>
      </section>
    </main>
  );
}
