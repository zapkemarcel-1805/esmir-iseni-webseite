"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DayPicker } from "react-day-picker";
import { de } from "date-fns/locale";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { business } from "@/config/business";
import { rentalVehicles } from "@/config/vehicles";
import { ServiceType } from "@/lib/types";

const TIME_SLOTS = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

const SERVICE_VALUES = new Set<ServiceType>([
  "sportwagenvermietung",
  "autoaufbereitung",
  "fahrzeugankauf",
  "fahrzeugverkauf",
]);

const DEFAULT_RENTAL = rentalVehicles[0]
  ? `${rentalVehicles[0].brand} ${rentalVehicles[0].model}`
  : "";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: ServiceType;
  message: string;
  vehicleModel: string;
  vBrand: string;
  vModel: string;
  vYear: string;
  vMileage: string;
  vPrice: string;
  vCondition: string;
};

export default function BookingForm() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "sportwagenvermietung",
    message: "",
    vehicleModel: DEFAULT_RENTAL,
    vBrand: "",
    vModel: "",
    vYear: "",
    vMileage: "",
    vPrice: "",
    vCondition: "",
  });
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [honeypot, setHoneypot] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const rawService = searchParams.get("service");
    const serviceParam =
      rawService && SERVICE_VALUES.has(rawService as ServiceType)
        ? (rawService as ServiceType)
        : null;
    const vehicleParam = searchParams.get("vehicle");

    setForm((current) => {
      const nextService = serviceParam ?? current.service;
      return {
        ...current,
        service: nextService,
        vehicleModel:
          vehicleParam ??
          (nextService === "sportwagenvermietung"
            ? DEFAULT_RENTAL
            : nextService === "fahrzeugverkauf"
              ? current.vehicleModel
              : ""),
      };
    });
  }, [searchParams]);

  const isAnkauf = form.service === "fahrzeugankauf";
  const isRental = form.service === "sportwagenvermietung";
  const isVehicleSale = form.service === "fahrzeugverkauf";

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleServiceChange(service: ServiceType) {
    setForm((current) => ({
      ...current,
      service,
      vehicleModel:
        service === "sportwagenvermietung"
          ? DEFAULT_RENTAL
          : service === "fahrzeugverkauf"
            ? current.vehicleModel
            : "",
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMsg(null);

    if (!date || !time) {
      setErrorMsg("Bitte wählen Sie ein Datum und eine Uhrzeit.");
      return;
    }

    if (!privacyAccepted) {
      setErrorMsg("Bitte bestätigen Sie die Datenschutzhinweise.");
      return;
    }

    setStatus("loading");

    const vehicle = isAnkauf
      ? {
          brand: form.vBrand || undefined,
          model: form.vModel || undefined,
          year: form.vYear || undefined,
          mileage: form.vMileage || undefined,
          price: form.vPrice || undefined,
          condition: form.vCondition || undefined,
        }
      : (isRental || isVehicleSale) && form.vehicleModel
        ? { model: form.vehicleModel }
        : undefined;

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          service: form.service,
          requestedDate: format(date, "yyyy-MM-dd"),
          requestedTime: time,
          vehicle,
          message: form.message || undefined,
          privacyAccepted,
          website: honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          data.error ??
            "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut."
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg(
        "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gold/40 bg-gold/5 p-10 text-center">
        <h3 className="font-display text-2xl font-semibold text-ink">
          Vielen Dank für Ihre Terminanfrage!
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/70">
          Wir haben Ihre Anfrage erhalten. Ihr Termin ist noch nicht verbindlich.
          Wir prüfen den Wunschtermin persönlich und informieren Sie anschließend
          per E-Mail.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="border border-gold/30 bg-gold/5 px-5 py-4 text-sm text-ink/80">
        Dies ist eine unverbindliche Terminanfrage. Ihr Termin wird erst nach
        unserer persönlichen Bestätigung verbindlich.
      </div>

      <input
        type="text"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Vorname" required>
          <input required value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} className="input" />
        </Field>
        <Field label="Nachname" required>
          <input required value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} className="input" />
        </Field>
        <Field label="E-Mail-Adresse" required>
          <input type="email" required value={form.email} onChange={(e) => updateField("email", e.target.value)} className="input" />
        </Field>
        <Field label="Telefonnummer" required>
          <input type="tel" required value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className="input" />
        </Field>
      </div>

      <Field label="Gewünschte Dienstleistung" required>
        <select
          value={form.service}
          onChange={(e) => handleServiceChange(e.target.value as ServiceType)}
          className="input"
        >
          {business.bookingServiceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      {isRental && (
        <Field label="Mietfahrzeug" required>
          <select
            required
            value={form.vehicleModel || DEFAULT_RENTAL}
            onChange={(e) => updateField("vehicleModel", e.target.value)}
            className="input"
          >
            {rentalVehicles.map((vehicle) => {
              const label = `${vehicle.brand} ${vehicle.model}`;
              return (
                <option key={vehicle.id} value={label}>
                  {label}
                </option>
              );
            })}
          </select>
        </Field>
      )}

      {isVehicleSale && (
        <Field label="Gewünschtes Fahrzeug (optional)">
          <input
            value={form.vehicleModel}
            onChange={(e) => updateField("vehicleModel", e.target.value)}
            placeholder="Fahrzeugbezeichnung"
            className="input"
          />
        </Field>
      )}

      {isAnkauf && (
        <div className="space-y-5 border border-ink/10 bg-ink/[0.02] p-5">
          <p className="text-xs font-semibold uppercase tracking-widest2 text-ink/50">
            Angaben zu Ihrem Fahrzeug
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Fahrzeugmarke"><input value={form.vBrand} onChange={(e) => updateField("vBrand", e.target.value)} className="input" /></Field>
            <Field label="Modell"><input value={form.vModel} onChange={(e) => updateField("vModel", e.target.value)} className="input" /></Field>
            <Field label="Baujahr"><input value={form.vYear} onChange={(e) => updateField("vYear", e.target.value)} className="input" /></Field>
            <Field label="Kilometerstand"><input value={form.vMileage} onChange={(e) => updateField("vMileage", e.target.value)} className="input" /></Field>
            <Field label="Gewünschter Verkaufspreis"><input value={form.vPrice} onChange={(e) => updateField("vPrice", e.target.value)} className="input" /></Field>
            <Field label="Zustand"><input value={form.vCondition} onChange={(e) => updateField("vCondition", e.target.value)} className="input" /></Field>
          </div>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <Field label="Wunschdatum" required>
          <div className="border border-ink/15 p-2">
            <DayPicker
              mode="single"
              locale={de}
              selected={date}
              onSelect={setDate}
              disabled={[{ before: today }, { dayOfWeek: [0] }]}
              className="rdp-esmir"
            />
          </div>
          <p className="mt-2 text-xs text-ink/50">Sonntag ist geschlossen.</p>
        </Field>

        <Field label="Wunschuhrzeit" required>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                type="button"
                key={slot}
                onClick={() => setTime(slot)}
                className={`border px-2 py-2 text-xs font-medium transition ${
                  time === slot
                    ? "border-gold bg-gold text-ink"
                    : "border-ink/15 text-ink/70 hover:border-gold"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink/50">
            Montag bis Samstag, {business.openingHours.from}-{business.openingHours.to} Uhr.
            Die tatsächliche Verfügbarkeit wird erst nach Ihrer Anfrage geprüft.
          </p>
        </Field>
      </div>

      <Field label="Besondere Wünsche / Nachricht (optional)">
        <textarea value={form.message} onChange={(e) => updateField("message", e.target.value)} rows={4} className="input" />
      </Field>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/70">
        <input
          type="checkbox"
          required
          checked={privacyAccepted}
          onChange={(e) => setPrivacyAccepted(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[#D4AF65]"
        />
        <span>
          Ich habe die <Link href="/datenschutz" className="font-medium text-gold underline underline-offset-2">Datenschutzerklärung</Link> gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung dieser Anfrage zu.
        </span>
      </label>

      {errorMsg && (
        <p className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{errorMsg}</p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-gold w-full disabled:opacity-60">
        {status === "loading" ? "Wird gesendet …" : "Terminanfrage senden"}
      </button>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-ink/60">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}
