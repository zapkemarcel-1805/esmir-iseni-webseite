export function CarIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M8 30l3-9c1-3 4-5 7-5h12c3 0 6 2 7 5l3 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="5"
        y="29"
        width="38"
        height="9"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="14" cy="38" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="34" cy="38" r="3.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function SparkleCarIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M6 30l2.5-8c1-3 4-5 7-5h10c3 0 6 2 7 5l2.5 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="4" y="29" width="30" height="8" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="37" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="26" cy="37" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M38 10l1.4 3.6L43 15l-3.6 1.4L38 20l-1.4-3.6L33 15l3.6-1.4z" fill="currentColor" />
      <path d="M42 22l0.9 2.1 2.1 0.9-2.1 0.9-0.9 2.1-0.9-2.1-2.1-0.9 2.1-0.9z" fill="currentColor" />
    </svg>
  );
}

export function HandshakeIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M6 22l7-6 8 5 6-3 8 5-2 8-6 3-4-2-6 3-5-3-6-3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M21 21l5 3-4 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function KeyIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="17" cy="24" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M24 24h18M36 24v6M41 24v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ShieldIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M24 6l14 5v11c0 10-6 17-14 20-8-3-14-10-14-20V11z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M18 24l4 4 8-9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DropletIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M24 6c6 9 12 16 12 23a12 12 0 1 1-24 0c0-7 6-14 12-23z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
