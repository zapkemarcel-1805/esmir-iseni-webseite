import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Termin buchen – ESMIR ISENI",
  description: "Unverbindliche Terminanfrage bei ESMIR ISENI in Gummersbach.",
};

export default function TerminBuchenPage() {
  return (
    <main>
      <section className="bg-ink py-16 text-white">
        <div className="container-page">
          <span className="eyebrow">Termin buchen</span>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
            TERMIN ANFRAGEN
          </h1>
          <p className="mt-4 max-w-xl text-silver/80">
            Füllen Sie das Formular aus — wir melden uns persönlich bei Ihnen,
            um Ihren Termin zu bestätigen.
          </p>
        </div>
      </section>

      <section className="container-page max-w-2xl py-16">
        <Suspense fallback={null}>
          <BookingForm />
        </Suspense>
      </section>
    </main>
  );
}
