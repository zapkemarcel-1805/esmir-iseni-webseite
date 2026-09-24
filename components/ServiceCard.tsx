import Link from "next/link";

export default function ServiceCard({
  icon,
  title,
  text,
  href,
  cta = "Mehr erfahren",
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
  cta?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 border border-ink/10 bg-white p-8 transition hover:border-gold/60 hover:shadow-[0_8px_30px_rgba(212,175,101,0.15)]"
    >
      <div className="text-gold">{icon}</div>
      <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-ink/65">{text}</p>
      <span className="mt-2 inline-flex items-center text-sm font-medium text-gold">
        {cta}
        <svg
          className="ml-1.5 h-4 w-4 transition group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
