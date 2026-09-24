import { RentalVehicle, SaleVehicle } from "@/lib/types";

/**
 * MIETFAHRZEUGE (Sportwagenvermietung)
 * --------------------------------------
 * Aktuell wird genau ein Mietfahrzeug angeboten. Die Struktur bleibt bewusst
 * als Array bestehen, damit später weitere Fahrzeuge ergänzt werden können.
 */
export const rentalVehicles: RentalVehicle[] = [
  {
    id: "vw-golf-8-gti-clubsport",
    brand: "Volkswagen",
    model: "Golf 8 GTI Clubsport",
    power: "300 PS",
    transmission: "DSG / Automatik",
    pricePerDay: "ab 199 €",
    includedKmPerDay: "200 km inklusive",
    weekendPrice: "349 €",
    weekendPeriod: "Freitag bis Montag",
    includedWeekendKm: "500 km inklusive",
    deposit: "500 € + eigenes Fahrzeug oder 1.000 € ohne eigenes Fahrzeug",
    drivingArea: "Deutschland",
    note: "Abweichende Vereinbarungen sind nach vorheriger Absprache möglich.",
    images: [
      "/vehicles/gti-front.jpg",
      "/vehicles/gti-front-close.jpg",
      "/vehicles/gti-rear.jpg",
      "/vehicles/gti-driver-view.jpg",
      "/vehicles/gti-passenger.jpg",
      "/vehicles/gti-rear-seats.jpg",
    ],
    available: true,
  },
];

/**
 * VERKAUFSFAHRZEUGE (Auto An- & Verkauf)
 * --------------------------------------
 * Noch keine Verkaufsfahrzeuge hinterlegt. Keine Platzhalter öffentlich zeigen.
 */
export const saleVehicles: SaleVehicle[] = [];
