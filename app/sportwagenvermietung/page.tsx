import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import VehicleGallery from "@/components/VehicleGallery";
import { rentalVehicles } from "@/config/vehicles";

export const metadata: Metadata = {
  title: "Golf 8 GTI Clubsport mieten in Gummersbach – ESMIR ISENI",
  description:
    "VW Golf 8 GTI Clubsport mit 300 PS in Gummersbach mieten. Tagesmiete ab 199 € inklusive 200 km. Unverbindliche Mietanfrage bei ESMIR ISENI.",
};

export default function SportwagenvermietungPage() {
  const vehicle = rentalVehicles[0];
  const vehicleName = `${vehicle.brand} ${vehicle.model}`;
  const bookingHref = `/termin-buchen?service=sportwagenvermietung&vehicle=${encodeURIComponent(
    vehicleName
  )}`;

  return (
    <main>
      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,101,0.18),transparent_40%)]" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="eyebrow">Sportwagenvermietung</span>
            <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
              SPORTWAGENVERMIETUNG
            </h1>
            <p className="mt-5 max-w-xl text-xl text-white">
              Fahrfreude erleben. Unser Golf 8 GTI Clubsport wartet auf Sie.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-silver/75">
              300 PS, sportliches Design und echtes GTI-Feeling. Entdecken Sie
              unser aktuelles Mietfahrzeug und senden Sie direkt Ihre
              unverbindliche Mietanfrage.
            </p>
            <Link href={bookingHref} className="btn-gold mt-8 inline-block">
              GTI jetzt anfragen
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-anthracite shadow-2xl shadow-black/30">
            <Image
              src="/vehicles/gti-front-close.jpg"
              alt="VW Golf 8 GTI Clubsport von ESMIR ISENI"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Aktuelles Mietfahrzeug
              </span>
              <p className="mt-1 font-display text-2xl font-semibold text-white">
                {vehicleName}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div>
            <span className="eyebrow">Unser GTI</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              {vehicleName}
            </h2>
            <p className="mt-2 text-lg font-medium text-gold">300 PS Fahrspaß</p>
            <div className="mt-8">
              <VehicleGallery images={vehicle.images} alt={vehicleName} />
            </div>
          </div>

          <aside className="border border-ink/10 bg-ink p-6 text-white sm:p-8 lg:sticky lg:top-28">
            <span className="eyebrow">Mietkonditionen</span>
            <div className="mt-6 space-y-5">
              <Condition label="Tagesmiete" value={vehicle.pricePerDay} sub={vehicle.includedKmPerDay} />
              <Condition label="Wochenende" value={vehicle.weekendPrice ?? "-"} sub={`${vehicle.weekendPeriod ?? ""}${vehicle.includedWeekendKm ? ` · ${vehicle.includedWeekendKm}` : ""}`} />
              <Condition label="Leistung" value={vehicle.power} />
              <Condition label="Getriebe" value={vehicle.transmission} />
              <Condition label="Fahrgebiet" value={vehicle.drivingArea ?? "Deutschland"} />
            </div>

            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-silver/60">Kaution</p>
              <p className="mt-2 text-sm leading-relaxed text-white/90">{vehicle.deposit}</p>
            </div>

            {vehicle.note && (
              <p className="mt-6 text-xs leading-relaxed text-silver/65">{vehicle.note}</p>
            )}

            <Link href={bookingHref} className="btn-gold mt-8 block w-full">
              GTI anfragen
            </Link>
          </aside>
        </div>
      </section>

      <section className="bg-anthracite py-16 text-white">
        <div className="container-page">
          <div className="border-l-2 border-gold pl-6">
            <span className="eyebrow">Wichtiger Hinweis</span>
            <p className="mt-3 max-w-3xl leading-relaxed text-silver/80">
              Die Verfügbarkeit des Fahrzeugs wird nach Ihrer Anfrage persönlich
              geprüft. Eine Anfrage stellt noch keine verbindliche Reservierung
              dar. Die Buchung ist erst nach unserer Bestätigung verbindlich.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-center text-white">
        <div className="container-page">
          <span className="eyebrow">Mietanfrage</span>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Bereit für GTI-Fahrspaß?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-silver/75">
            Senden Sie uns jetzt Ihre Mietanfrage für den VW Golf 8 GTI Clubsport.
            Wir prüfen den gewünschten Zeitraum und melden uns schnellstmöglich
            bei Ihnen.
          </p>
          <Link href={bookingHref} className="btn-gold mt-8 inline-block">
            GTI anfragen
          </Link>
        </div>
      </section>
    </main>
  );
}

function Condition({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0">
      <dt className="text-xs uppercase tracking-[0.18em] text-silver/55">{label}</dt>
      <dd className="mt-1 font-display text-xl font-semibold text-white">{value}</dd>
      {sub && <p className="mt-1 text-xs text-gold-light/85">{sub}</p>}
    </div>
  );
}
