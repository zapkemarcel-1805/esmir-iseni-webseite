import Image from "next/image";
import Link from "next/link";

export default function Logo({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "mark";
  className?: string;
}) {
  const isMark = variant === "mark";

  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="ESMIR ISENI – Startseite"
    >
      <Image
        src={isMark ? "/brand/esmir-iseni-signet.png" : "/brand/esmir-iseni-logo.png"}
        alt={isMark ? "ESMIR ISENI Logo" : "ESMIR ISENI"}
        width={isMark ? 160 : 260}
        height={isMark ? 90 : 135}
        priority
        className={isMark ? "h-12 w-auto object-contain" : "h-14 w-auto object-contain sm:h-16"}
      />
    </Link>
  );
}
