import Link from "next/link";
import { RentalVehicle, SaleVehicle } from "@/lib/types";

function EmptyState({ text }: { text: string }) {
  return (
    <div className="border border-dashed border-ink/20 bg-ink/[0.02] p-12 text-center">
      <p className="text-sm text-ink/50">{text}</p>
    </div>
  );
}

export function RentalVehicleGrid({ vehicles }: { vehicles: RentalVehicle[] }) {
  if (vehicles.length === 0) {
    return (
      <EmptyState text="Hier erscheinen in Kürze unsere verfügbaren Mietfahrzeuge. Bitte kontaktieren Sie uns für aktuelle Verfügbarkeiten." />
    );
  }
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((v) => (
        <div key={v.id} className="flex flex-col border border-ink/10 bg-white">
          <div className="aspect-[4/3] bg-anthracite" />
          <div className="flex flex-1 flex-col gap-2 p-6">
            <h3 className="font-display text-lg font-semibold text-ink">
              {v.brand} {v.model}
            </h3>
            <dl className="grid grid-cols-2 gap-y-1 text-xs text-ink/60">
              <dt>Baujahr</dt>
              <dd className="text-right text-ink">{v.year}</dd>
              <dt>Leistung</dt>
              <dd className="text-right text-ink">{v.power}</dd>
              <dt>Getriebe</dt>
              <dd className="text-right text-ink">{v.transmission}</dd>
              <dt>Kaution</dt>
              <dd className="text-right text-ink">{v.deposit}</dd>
            </dl>
            <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-3">
              <span className="font-display text-base font-semibold text-gold">
                {v.pricePerDay}
              </span>
              <Link
                href={`/termin-buchen?service=sportwagenvermietung&vehicle=${encodeURIComponent(
                  `${v.brand} ${v.model}`
                )}`}
                className="rounded-sm bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:bg-gold hover:text-ink"
              >
                Fahrzeug anfragen
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SaleVehicleGrid({ vehicles }: { vehicles: SaleVehicle[] }) {
  if (vehicles.length === 0) {
    return (
      <EmptyState text="Aktuell sind hier keine Verkaufsfahrzeuge hinterlegt. Sprechen Sie uns gerne direkt an." />
    );
  }
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((v) => (
        <div key={v.id} className="flex flex-col border border-ink/10 bg-white">
          <div className="aspect-[4/3] bg-anthracite" />
          <div className="flex flex-1 flex-col gap-2 p-6">
            <h3 className="font-display text-lg font-semibold text-ink">
              {v.brand} {v.model}
            </h3>
            <dl className="grid grid-cols-2 gap-y-1 text-xs text-ink/60">
              <dt>Baujahr</dt>
              <dd className="text-right text-ink">{v.year}</dd>
              <dt>Kilometerstand</dt>
              <dd className="text-right text-ink">{v.mileage}</dd>
              <dt>Leistung</dt>
              <dd className="text-right text-ink">{v.power}</dd>
              <dt>Kraftstoff</dt>
              <dd className="text-right text-ink">{v.fuel}</dd>
            </dl>
            <p className="mt-2 text-xs leading-relaxed text-ink/60">
              {v.description}
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-3">
              <span className="font-display text-base font-semibold text-gold">
                {v.price}
              </span>
              <Link
                href={`/termin-buchen?service=fahrzeugverkauf&vehicle=${encodeURIComponent(
                  `${v.brand} ${v.model}`
                )}`}
                className="rounded-sm bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:bg-gold hover:text-ink"
              >
                Fahrzeug anfragen
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
