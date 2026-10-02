import type { Metadata } from "next";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – ESMIR ISENI",
};

function Missing({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gold/20 px-1 text-ink">
      [Noch zu prüfen: {children}]
    </span>
  );
}

export default function DatenschutzPage() {
  return (
    <main className="container-page max-w-3xl py-20">
      <h1 className="font-display text-3xl font-semibold text-ink">
        Datenschutzerklärung
      </h1>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink/80">
        {/* 1. Verantwortlicher */}
        <section>
          <h2 className="font-semibold text-ink">
            1. Verantwortlicher
          </h2>

          <p className="mt-2">
            Verantwortlicher für die Datenverarbeitung auf dieser Webseite ist:
          </p>

          <p className="mt-2">
            {business.legalName}
            <br />
            {business.address.street}
            <br />
            {business.address.zip} {business.address.city}
            <br />
            Deutschland
            <br />
            <br />
            Telefon: {business.contact.phoneFormatted}
            <br />
            E-Mail:{" "}
            <a
              href={`mailto:${business.contact.email}`}
              className="text-gold hover:underline"
            >
              {business.contact.email}
            </a>
          </p>
        </section>

        {/* 2. Allgemeine Hinweise */}
        <section>
          <h2 className="font-semibold text-ink">
            2. Allgemeine Hinweise zur Datenverarbeitung
          </h2>

          <p className="mt-2">
            Wir verarbeiten personenbezogene Daten nur, soweit dies zur
            Bereitstellung dieser Webseite, zur Bearbeitung von Anfragen oder
            zur Durchführung bzw. Anbahnung eines Vertrags erforderlich ist.
          </p>

          <p className="mt-2">
            Personenbezogene Daten sind alle Informationen, mit denen eine
            natürliche Person direkt oder indirekt identifiziert werden kann.
          </p>

          <p className="mt-2">
            Die Verarbeitung erfolgt insbesondere auf Grundlage von Art. 6
            Abs. 1 lit. b DSGVO, soweit die Verarbeitung zur Durchführung
            vorvertraglicher Maßnahmen oder zur Erfüllung eines Vertrags
            erforderlich ist, sowie auf Grundlage von Art. 6 Abs. 1 lit. f
            DSGVO, soweit ein berechtigtes Interesse an einem sicheren und
            zuverlässigen Betrieb der Webseite oder an der Bearbeitung von
            Anfragen besteht.
          </p>
        </section>

        {/* 3. Hosting */}
        <section>
          <h2 className="font-semibold text-ink">
            3. Hosting
          </h2>

          <p className="mt-2">
            Diese Webseite wird über Vercel bereitgestellt.
          </p>

          <p className="mt-2">
            Anbieter ist Vercel Inc., 440 N Barranca Ave #4133, Covina,
            CA 91723, USA.
          </p>

          <p className="mt-2">
            Beim Aufruf dieser Webseite können technisch erforderliche
            Verbindungs- und Protokolldaten verarbeitet werden. Dazu können
            insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs,
            aufgerufene Seite, Browserinformationen und weitere technische
            Verbindungsdaten gehören.
          </p>

          <p className="mt-2">
            Die Verarbeitung erfolgt zur sicheren und zuverlässigen
            Bereitstellung der Webseite auf Grundlage von Art. 6 Abs. 1
            lit. f DSGVO. Unser berechtigtes Interesse liegt in der sicheren,
            stabilen und technisch fehlerfreien Bereitstellung unseres
            Internetauftritts.
          </p>

          <p className="mt-2">
            Da Vercel ein Unternehmen mit Sitz in den USA ist, kann eine
            Verarbeitung personenbezogener Daten außerhalb der Europäischen
            Union bzw. des Europäischen Wirtschaftsraums nicht ausgeschlossen
            werden. Dabei werden die nach den anwendbaren
            Datenschutzvorschriften vorgesehenen Schutzmechanismen eingesetzt.
          </p>
        </section>

        {/* 4. Kontaktaufnahme */}
        <section>
          <h2 className="font-semibold text-ink">
            4. Kontaktaufnahme
          </h2>

          <p className="mt-2">
            Wenn Sie uns per E-Mail, telefonisch oder auf anderem Wege
            kontaktieren, verarbeiten wir die von Ihnen übermittelten Daten,
            um Ihre Anfrage zu bearbeiten und gegebenenfalls Anschlussfragen
            zu beantworten.
          </p>

          <p className="mt-2">
            Soweit Ihre Anfrage der Anbahnung oder Durchführung eines Vertrags
            dient, erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1
            lit. b DSGVO. In anderen Fällen erfolgt die Verarbeitung auf
            Grundlage von Art. 6 Abs. 1 lit. f DSGVO aufgrund unseres
            berechtigten Interesses an der Bearbeitung Ihrer Anfrage.
          </p>
        </section>

        {/* 5. Terminanfrage */}
        <section>
          <h2 className="font-semibold text-ink">
            5. Terminanfragen über die Webseite
          </h2>

          <p className="mt-2">
            Wenn Sie über unsere Webseite eine Terminanfrage stellen,
            verarbeiten wir die von Ihnen eingegebenen Daten zur Bearbeitung
            Ihrer Anfrage.
          </p>

          <p className="mt-2">
            Hierzu können insbesondere folgende Daten gehören:
          </p>

          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Name</li>
            <li>E-Mail-Adresse</li>
            <li>Telefonnummer</li>
            <li>gewünschte Dienstleistung</li>
            <li>gewünschter Termin</li>
            <li>Fahrzeugdaten</li>
            <li>Inhalt Ihrer Nachricht</li>
          </ul>

          <p className="mt-2">
            Die Verarbeitung erfolgt grundsätzlich auf Grundlage von Art. 6
            Abs. 1 lit. b DSGVO, da sie der Durchführung vorvertraglicher
            Maßnahmen bzw. der Vorbereitung eines möglichen Vertrags dient.
          </p>
        </section>

        {/* 6. Datenbank */}
        <section>
          <h2 className="font-semibold text-ink">
            6. Speicherung von Terminanfragen
          </h2>

          <p className="mt-2">
            Die über das Anfrageformular übermittelten Daten werden
            gegebenenfalls bei einem externen Datenbankanbieter gespeichert.
          </p>

          <p className="mt-2">
            <Missing>
              Hier müssen wir den tatsächlich verwendeten Datenbankanbieter
              eintragen. Falls du Supabase verwendest, passe ich diesen
              Abschnitt dafür fertig an.
            </Missing>
          </p>
        </section>

        {/* 7. E-Mail */}
        <section>
          <h2 className="font-semibold text-ink">
            7. E-Mail-Versand und Terminbestätigungen
          </h2>

          <p className="mt-2">
            Zur Bearbeitung von Terminanfragen können Bestätigungen,
            Rückfragen oder Absagen per E-Mail versendet werden.
          </p>

          <p className="mt-2">
            Dabei werden insbesondere die E-Mail-Adresse des Empfängers sowie
            die für die jeweilige Nachricht erforderlichen Inhalte verarbeitet.
          </p>

          <p className="mt-2">
            <Missing>
              Hier müssen wir den tatsächlich verwendeten E-Mail-Dienst
              eintragen. Falls du Resend verwendest, passe ich diesen Abschnitt
              dafür fertig an.
            </Missing>
          </p>
        </section>

        {/* 8. Speicherdauer */}
        <section>
          <h2 className="font-semibold text-ink">
            8. Speicherdauer
          </h2>

          <p className="mt-2">
            Personenbezogene Daten werden grundsätzlich nur so lange
            gespeichert, wie dies für den jeweiligen Verarbeitungszweck
            erforderlich ist.
          </p>

          <p className="mt-2">
            Daten aus Anfragen werden gelöscht, sobald die jeweilige Anfrage
            abschließend bearbeitet wurde und keine gesetzlichen
            Aufbewahrungspflichten oder sonstigen berechtigten Gründe für eine
            weitere Speicherung bestehen.
          </p>

          <p className="mt-2">
            Soweit aus einer Anfrage ein Vertrag entsteht, können einzelne
            Daten aufgrund gesetzlicher handels- oder steuerrechtlicher
            Aufbewahrungspflichten länger gespeichert werden.
          </p>
        </section>

        {/* 9. Cookies */}
        <section>
          <h2 className="font-semibold text-ink">
            9. Cookies und Tracking
          </h2>

          <p className="mt-2">
            Soweit auf dieser Webseite ausschließlich technisch erforderliche
            Funktionen verwendet werden und keine Analyse-, Marketing- oder
            Tracking-Dienste eingesetzt werden, erfolgt kein Tracking zu
            Werbe- oder Analysezwecken.
          </p>

          <p className="mt-2">
            <Missing>
              Vor Veröffentlichung noch prüfen, ob Vercel Analytics,
              Google Analytics, Meta Pixel, YouTube, Google Maps oder andere
              externe Dienste eingebunden sind.
            </Missing>
          </p>
        </section>

        {/* 10. SSL */}
        <section>
          <h2 className="font-semibold text-ink">
            10. Verschlüsselte Übertragung
          </h2>

          <p className="mt-2">
            Diese Webseite nutzt eine verschlüsselte HTTPS-Verbindung.
            Dadurch können Daten, die zwischen Ihrem Browser und unserer
            Webseite übertragen werden, nicht ohne Weiteres von Dritten
            mitgelesen werden.
          </p>
        </section>

        {/* 11. Rechte */}
        <section>
          <h2 className="font-semibold text-ink">
            11. Ihre Rechte
          </h2>

          <p className="mt-2">
            Sie haben nach Maßgabe der gesetzlichen Voraussetzungen
            insbesondere folgende Rechte:
          </p>

          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Recht auf Auskunft über Ihre gespeicherten Daten</li>
            <li>Recht auf Berichtigung unrichtiger Daten</li>
            <li>Recht auf Löschung Ihrer Daten</li>
            <li>Recht auf Einschränkung der Verarbeitung</li>
            <li>Recht auf Datenübertragbarkeit</li>
            <li>Recht auf Widerspruch gegen bestimmte Verarbeitungen</li>
          </ul>

          <p className="mt-2">
            Zur Ausübung Ihrer Rechte können Sie sich jederzeit an{" "}
            <a
              href={`mailto:${business.contact.email}`}
              className="text-gold hover:underline"
            >
              {business.contact.email}
            </a>{" "}
            wenden.
          </p>
        </section>

        {/* 12. Widerspruch */}
        <section>
          <h2 className="font-semibold text-ink">
            12. Widerspruchsrecht
          </h2>

          <p className="mt-2">
            Soweit personenbezogene Daten auf Grundlage von Art. 6 Abs. 1
            lit. f DSGVO verarbeitet werden, haben Sie unter den gesetzlichen
            Voraussetzungen das Recht, aus Gründen, die sich aus Ihrer
            besonderen Situation ergeben, Widerspruch gegen die Verarbeitung
            einzulegen.
          </p>
        </section>

        {/* 13. Beschwerde */}
        <section>
          <h2 className="font-semibold text-ink">
            13. Beschwerderecht bei einer Aufsichtsbehörde
          </h2>

          <p className="mt-2">
            Sie haben das Recht, sich bei einer zuständigen
            Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht
            sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen
            die Datenschutz-Grundverordnung verstößt.
          </p>
        </section>

        {/* 14. Änderungen */}
        <section>
          <h2 className="font-semibold text-ink">
            14. Änderungen dieser Datenschutzerklärung
          </h2>

          <p className="mt-2">
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn
            sich die technische Ausgestaltung der Webseite oder die
            eingesetzten Dienste ändern.
          </p>
        </section>
      </div>
    </main>
  );
}