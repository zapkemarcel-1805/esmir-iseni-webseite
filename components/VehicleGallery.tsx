"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function VehicleGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  function previous() {
    setActive((current) => (current - 1 + images.length) % images.length);
  }

  function next() {
    setActive((current) => (current + 1) % images.length);
  }

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") {
        setActive((current) => (current - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        setActive((current) => (current + 1) % images.length);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, images.length]);

  if (images.length === 0) return null;

  function onTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 45) return;
    if (delta > 0) previous();
    else next();
  }

  return (
    <div>
      <div
        className="group relative aspect-[4/3] overflow-hidden bg-ink sm:aspect-[16/10]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute inset-0 z-10 cursor-zoom-in"
          aria-label="Fahrzeugbild vergrößern"
        />
        <Image
          src={images[active]}
          alt={`${alt} – Ansicht ${active + 1}`}
          fill
          priority={active === 0}
          sizes="(max-width: 768px) 100vw, 65vw"
          className="object-cover transition duration-500 group-hover:scale-[1.015]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between bg-gradient-to-t from-black/65 to-transparent p-4 text-xs text-white/80">
          <span>Zum Vergrößern antippen</span>
          <span>
            {active + 1} / {images.length}
          </span>
        </div>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                previous();
              }}
              className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/55 px-3 py-2 text-xl text-white backdrop-blur transition hover:border-gold hover:text-gold"
              aria-label="Vorheriges Bild"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/55 px-3 py-2 text-xl text-white backdrop-blur transition hover:border-gold hover:text-gold"
              aria-label="Nächstes Bild"
            >
              ›
            </button>
          </>
        )}
      </div>

      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(index)}
            className={`relative h-20 min-w-20 overflow-hidden border transition sm:h-24 sm:min-w-28 ${
              active === index ? "border-gold" : "border-ink/10 hover:border-gold/60"
            }`}
            aria-label={`Ansicht ${index + 1} anzeigen`}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="112px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} Bildergalerie`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xl text-white hover:border-gold hover:text-gold"
            aria-label="Galerie schließen"
          >
            ×
          </button>
          <button
            type="button"
            onClick={previous}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 px-4 py-3 text-2xl text-white hover:border-gold hover:text-gold sm:left-8"
            aria-label="Vorheriges Bild"
          >
            ‹
          </button>
          <div className="relative h-[80vh] w-full max-w-6xl">
            <Image
              src={images[active]}
              alt={`${alt} – Ansicht ${active + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 px-4 py-3 text-2xl text-white hover:border-gold hover:text-gold sm:right-8"
            aria-label="Nächstes Bild"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
