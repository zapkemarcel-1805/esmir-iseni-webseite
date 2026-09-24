import Image from "next/image";
import Link from "next/link";
import { business } from "@/config/business";
import ServiceCard from "@/components/ServiceCard";
import { CarIcon, SparkleCarIcon, HandshakeIcon } from "@/components/icons";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,101,0.18),transparent_38%)]" />
        <div className="container-page relative grid min-h-[86vh] gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
          <div className="z-10">
            <span className="eyebrow">ESMIR ISENI · GUMMERSBACH</span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.08] sm:text-6xl">
              {business.slogan.split(". ").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 ? "." : ""}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-silver/80 sm:text-lg">
              {business.description}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/termin-buchen" className="btn-gold">
                Jetzt Termin anfragen
              </Link>
              <a href="#dienstleistungen" className="btn-outline">
                Unsere Dienstleistungen
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-anthracite shadow-2xl shadow-black/30 sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="/vehicles/gti-front.jpg"
              alt="VW Golf 8 GTI Clubsport bei ESMIR ISENI in Gummersbach"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Unser aktuelles Mietfahrzeug
              </span>
              <p className="mt-2 font-display text-2xl font-semibold text-white">
                VW Golf 8 GTI Clubsport · 300 PS
              </p>
              <Link
                href="/sportwagenvermietung"
                className="mt-4 inline-flex text-sm font-semibold text-gold hover:text-gold-light"
              >
                GTI entdecken →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DIENSTLEISTUNGEN */}
      <section id="dienstleistungen" className="container-page py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Unsere Dienstleistungen</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Drei Bereiche. Ein Anspruch.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <ServiceCard
            icon={<CarIcon />}
            title={business.services[0].title}
            text={business.services[0].shortText}
            href={business.services[0].href}
            cta="GTI entdecken"
          />
          <ServiceCard
            icon={<SparkleCarIcon />}
            title={business.services[1].title}
            text={business.services[1].shortText}
            href={business.services[1].href}
          />
          <ServiceCard
            icon={<HandshakeIcon />}
            title={business.services[2].title}
            text={business.services[2].shortText}
            href={business.services[2].href}
          />
        </div>
      </section>

      {/* ÜBER UNS */}
      <section className="bg-anthracite py-24 text-white">
        <div className="container-page grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="eyebrow">Über uns</span>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Ihr Ansprechpartner rund ums Fahrzeug in Gummersbach
            </h2>
            <p className="mt-5 leading-relaxed text-silver/80">
              {business.name} steht für Sportwagenvermietung, professionelle
              Autoaufbereitung und einen fairen, transparenten Fahrzeughandel
              — alles aus einer Hand, mit persönlichem Kontakt und kurzen Wegen
              in {business.address.city}.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10 bg-ink">
            <Image
              src="/about/esmir-iseni-gti.jpg"
              alt="ESMIR ISENI mit dem VW Golf 8 GTI Clubsport"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-[center_35%]"
            />
          </div>
        </div>
      </section>

      {/* STANDORT & KONTAKT */}
      <section className="container-page py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <span className="eyebrow">Standort</span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
              {business.address.street}, {business.address.zip} {business.address.city}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              Besuchen Sie uns vor Ort oder kontaktieren Sie uns telefonisch,
              per WhatsApp oder E-Mail — wir freuen uns auf Sie.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-ink/80">
              <li>
                Telefon: <a href={business.contact.phoneHref} className="text-gold">{business.contact.phoneFormatted}</a>
              </li>
              <li>
                E-Mail: <a href={`mailto:${business.contact.email}`} className="text-gold">{business.contact.email}</a>
              </li>
              <li>
                WhatsApp: <a href={business.contact.whatsapp} className="text-gold">Nachricht senden</a>
              </li>
              <li>Öffnungszeiten: {business.openingHours.note}</li>
            </ul>
          </div>
          <div className="border border-ink/10 bg-ink/[0.025] p-8">
            <span className="eyebrow">Direkt erreichbar</span>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
              Persönlich anfragen
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              Ob GTI-Mietanfrage, Fahrzeugaufbereitung oder An- und Verkauf:
              Schreiben Sie uns über WhatsApp oder senden Sie direkt eine
              Terminanfrage über die Webseite.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={business.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-sm bg-ink px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-gold hover:text-ink">
                WhatsApp
              </a>
              <Link href="/termin-buchen" className="rounded-sm border border-ink/20 px-6 py-3 text-center text-sm font-semibold text-ink transition hover:border-gold hover:text-gold">
                Termin anfragen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-24 text-center text-white">
        <div className="container-page">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Bereit für Ihre Anfrage?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-silver/75">
            Stellen Sie jetzt eine unverbindliche Terminanfrage — wir prüfen
            den gewünschten Termin und melden uns persönlich bei Ihnen zurück.
          </p>
          <Link href="/termin-buchen" className="btn-gold mt-8 inline-block">
            Jetzt Termin anfragen
          </Link>
        </div>
      </section>
    </main>
  );
}
