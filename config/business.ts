/**
 * ZENTRALE UNTERNEHMENSKONFIGURATION
 * -----------------------------------
 * Alle Texte, Kontaktdaten und Einstellungen der Webseite werden hier gepflegt.
 * Änderungen hier wirken sich automatisch auf die ganze Webseite aus.
 */

export const business = {
  name: "ESMIR ISENI",
  legalName: "Esmir Iseni", // Für Impressum ggf. anpassen (Einzelunternehmen/Firma)
  slogan: "FAHRFREUDE. FLEXIBILITÄT. VERTRAUEN.",
  description:
    "Sportwagenvermietung, professionelle Autoaufbereitung und Fahrzeughandel in Gummersbach.",

  address: {
    street: "Brunohler Straße 21a",
    zip: "51645",
    city: "Gummersbach",
    country: "Deutschland",
    // Für Google Maps Einbettung / Routenplaner
    mapsQuery: "Brunohler Straße 21a, 51645 Gummersbach",
  },

  contact: {
    phone: "017684457635",
    phoneFormatted: "0176 8445 7635",
    phoneHref: "tel:+4917684457635",
    email: "iseniesmir@hotmail.com",
    whatsapp: "https://wa.me/4917684457635",
    instagram: {
      handle: "@isen.i33",
      url: "https://instagram.com/isen.i33",
    },
    tiktok: {
      handle: "@eiauto51645",
      url: "https://www.tiktok.com/@eiauto51645",
    },
  },

  /** Öffnungszeiten: Montag bis Samstag 10:00-18:00 Uhr, Sonntag geschlossen. */
  openingHours: {
    isPlaceholder: false,
    from: "10:00",
    to: "18:00",
    days: [
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ] as string[],
    note: "Montag bis Samstag: 10:00-18:00 Uhr. Sonntag geschlossen.",
  },

  services: [
    {
      id: "sportwagenvermietung",
      title: "Sportwagenvermietung",
      shortText:
        "Fahrfreude mit unserem VW Golf 8 GTI Clubsport - 300 PS, sportliches Design und flexible Mietmöglichkeiten.",
      href: "/sportwagenvermietung",
    },
    {
      id: "autoaufbereitung",
      title: "Autoaufbereitung",
      shortText:
        "Professionelle Fahrzeugpflege für innen und außen – gründlich, sorgfältig und mit Liebe zum Detail.",
      href: "/autoaufbereitung",
    },
    {
      id: "an-und-verkauf",
      title: "Auto An- & Verkauf",
      shortText:
        "Ihr Ansprechpartner für den fairen, transparenten und sicheren An- und Verkauf von Fahrzeugen.",
      href: "/an-und-verkauf",
    },
  ],

  // Optionen im Buchungsformular — Werte müssen mit lib/types.ts (ServiceType) übereinstimmen
  bookingServiceOptions: [
    { value: "sportwagenvermietung", label: "Sportwagenvermietung" },
    { value: "autoaufbereitung", label: "Autoaufbereitung" },
    { value: "fahrzeugankauf", label: "Fahrzeugankauf" },
    { value: "fahrzeugverkauf", label: "Fahrzeugverkauf" },
  ],

  colors: {
    ink: "#111111",
    anthracite: "#1D1D1D",
    gold: "#D4AF65",
    goldLight: "#F0D38D",
    silver: "#C0C0C0",
    white: "#FFFFFF",
  },
};

export type Business = typeof business;
