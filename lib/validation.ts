import { z } from "zod";

export const vehicleSnapshotSchema = z
  .object({
    brand: z.string().max(60).optional(),
    model: z.string().max(60).optional(),
    year: z.string().max(10).optional(),
    mileage: z.string().max(20).optional(),
    price: z.string().max(30).optional(),
    condition: z.string().max(200).optional(),
  })
  .partial()
  .optional()
  .nullable();

export const bookingRequestSchema = z.object({
  firstName: z.string().trim().min(1, "Vorname ist erforderlich").max(80),
  lastName: z.string().trim().min(1, "Nachname ist erforderlich").max(80),
  email: z.string().trim().email("Bitte eine gültige E-Mail-Adresse angeben").max(160),
  phone: z
    .string()
    .trim()
    .min(5, "Bitte eine gültige Telefonnummer angeben")
    .max(30)
    .regex(/^[0-9+()\-\s/]+$/, "Bitte eine gültige Telefonnummer angeben"),
  service: z.enum([
    "sportwagenvermietung",
    "autoaufbereitung",
    "fahrzeugankauf",
    "fahrzeugverkauf",
  ]),
  requestedDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Bitte ein gültiges Datum wählen"),
  requestedTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Bitte eine gültige Uhrzeit wählen"),
  vehicle: vehicleSnapshotSchema,
  message: z.string().trim().max(2000).optional().nullable(),
  privacyAccepted: z.literal(true, {
    errorMap: () => ({ message: "Bitte bestätigen Sie die Datenschutzhinweise" }),
  }),
  // Honeypot-Feld gegen einfache Spam-Bots — muss leer bleiben
  website: z.string().max(0).optional(),
});

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;
