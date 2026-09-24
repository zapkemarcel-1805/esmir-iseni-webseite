import Link from "next/link";
import Logo from "./Logo";
import { business } from "@/config/business";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-silver/90">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver/70">
            {business.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white">
            Dienstleistungen
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {business.services.map((s) => (
              <li key={s.id}>
                <Link href={s.href} className="hover:text-gold">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/termin-buchen" className="hover:text-gold">
                Termin buchen
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white">
            Kontakt
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{business.address.street}</li>
            <li>
              {business.address.zip} {business.address.city}
            </li>
            <li>
              <a href={business.contact.phoneHref} className="hover:text-gold">
                {business.contact.phoneFormatted}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${business.contact.email}`}
                className="hover:text-gold"
              >
                {business.contact.email}
              </a>
            </li>
            <li>
              <a
                href={business.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white">
            Öffnungszeiten
          </h3>
          <p className="mt-4 text-sm leading-relaxed">
            Montag bis Samstag<br />
            {business.openingHours.from}-{business.openingHours.to} Uhr<br />
            Sonntag geschlossen
          </p>
          <div className="mt-4 flex gap-4">
            <a
              href={business.contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-gold"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href={business.contact.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-gold"
              aria-label="TikTok"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-silver/50 md:flex-row">
          <span>
            © {new Date().getFullYear()} {business.name}. Alle Rechte
            vorbehalten.
          </span>
          <div className="flex gap-4">
            <Link href="/impressum" className="hover:text-gold">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-gold">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
