"use client";

import { useState } from "react";
import { business } from "@/config/business";

const serviceLabels: Record<string, string> = {
  sportwagenvermietung: "Sportwagenvermietung",
  autoaufbereitung: "Autoaufbereitung",
  fahrzeugankauf: "Fahrzeugankauf",
  fahrzeugverkauf: "Fahrzeugverkauf",
};

export default function ConfirmActionClient({ token }: { token: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);
  const [emailWarning, setEmailWarning] = useState(false);

  async function handleConfirm() {
    setStatus("loading");
    try {
      const res = await fetch("/api/booking/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Der Termin konnte nicht bestätigt werden.");
        return;
      }

      setStatus("done");
      setEmailWarning(!data.customerEmailSent);
    } catch {
      setStatus("error");
      setMessage("Es ist ein unerwarteter Fehler aufgetreten.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-lg border border-gold/40 bg-gold/10 p-6 text-center">
        <p className="text-lg font-medium text-ink">
          Der Termin wurde erfolgreich bestätigt.
        </p>
        <p className="mt-2 text-sm text-ink/70">
          {emailWarning
            ? "Achtung: Die Bestätigungs-E-Mail an den Kunden konnte nicht zugestellt werden. Bitte informieren Sie den Kunden zusätzlich telefonisch."
            : "Der Kunde wurde per E-Mail benachrichtigt."}
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-center">
        <p className="font-medium text-red-800">{message}</p>
      </div>
    );
  }

  return (
    <button
      onClick={handleConfirm}
      disabled={status === "loading"}
      className="w-full rounded-md bg-gold px-6 py-4 text-center font-semibold tracking-wide text-ink transition hover:bg-gold-light disabled:opacity-60"
    >
      {status === "loading"
        ? "Wird bestätigt …"
        : "Termin jetzt verbindlich bestätigen"}
    </button>
  );
}
