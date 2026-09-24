export type ServiceType =
  | "sportwagenvermietung"
  | "autoaufbereitung"
  | "fahrzeugankauf"
  | "fahrzeugverkauf";

export type BookingStatus = "PENDING" | "CONFIRMED" | "DECLINED" | "EXPIRED";

export interface VehicleSnapshot {
  brand?: string;
  model?: string;
  year?: string;
  mileage?: string;
  price?: string;
  condition?: string;
}

export interface BookingRequestRecord {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service: ServiceType;
  requested_date: string; // YYYY-MM-DD
  requested_time: string; // HH:mm
  vehicle: VehicleSnapshot | null;
  message: string | null;
  status: BookingStatus;
  confirm_token_hash: string;
  decline_token_hash: string;
  token_expires_at: string;
  decided_at: string | null;
  confirm_email_sent: boolean;
  decline_email_sent: boolean;
  receipt_email_sent: boolean;
  owner_notified_at: string | null;
}

// Fahrzeuge (Mietwagen / Verkaufsfahrzeuge) — Platzhalterstruktur zum späteren Befüllen
export interface RentalVehicle {
  id: string;
  brand: string;
  model: string;
  year?: number;
  power: string;
  transmission: string;
  pricePerDay: string;
  includedKmPerDay?: string;
  weekendPrice?: string;
  weekendPeriod?: string;
  includedWeekendKm?: string;
  deposit: string;
  drivingArea?: string;
  note?: string;
  images: string[];
  available: boolean;
}

export interface SaleVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: string;
  power: string;
  transmission: string;
  fuel: string;
  price: string;
  description: string;
  images: string[];
}
