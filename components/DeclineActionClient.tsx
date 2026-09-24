"use client";

import { useState } from "react";

export default function DeclineActionClient({ token }: { token: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);
  const [emailWarning, setEmailWarning] = useState(false);

  async function handleDecline() {
    setStatus("loading");
    try {
      const res = await fetch("/api/booking/decline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Die Anfrage konnte nicht abgelehnt werden.");
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
      <div className="rounded-lg border border-anthracite/20 bg-anthracite/5 p-6 text-center">
        <p className="text-lg font-medium text-ink">
          Die Anfrage wurde abgelehnt.
        </p>
        <p className="mt-2 text-sm text-ink/70">
          {emailWarning
            ? "Achtung: Die Absage-E-Mail konnte nicht zugestellt werden. Bitte informieren Sie den Kunden zusätzlich telefonisch."
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
      onClick={handleDecline}
      disabled={status === "loading"}
      className="w-full rounded-md border border-ink/20 bg-white px-6 py-4 text-center font-semibold tracking-wide text-ink transition hover:bg-ink/5 disabled:opacity-60"
    >
      {status === "loading" ? "Wird verarbeitet …" : "Anfrage endgültig ablehnen"}
    </button>
  );
}
