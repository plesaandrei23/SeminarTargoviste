import { Download, FileText, FileArchive, FileSpreadsheet } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Inline download tile — used on regulamente / anti-bullying / Erasmus /
 * mobilitate cadre pages anywhere we surface an institutional PDF.
 *
 * The icon picks itself by extension (pdf/doc/xls), the byline is optional
 * (date, source, "actualizat YYYY-MM"), and the card behaves like a single
 * focus stop with a clear hover affordance.
 */

type Variant = "light" | "dark";

export function DownloadCard({
  href,
  title,
  byline,
  variant = "light",
  external = false,
}: {
  href: string;
  title: string;
  byline?: string;
  variant?: Variant;
  external?: boolean;
}) {
  const ext = (href.split(".").pop() || "").toLowerCase();
  const Icon = ext === "pdf"
    ? FileText
    : ext === "xls" || ext === "xlsx"
      ? FileSpreadsheet
      : FileArchive;

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={!external}
      className={cn(
        "group flex items-start gap-4 rounded-2xl border p-5 transition-all duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
        variant === "light"
          ? "border-navy/10 bg-paper hover:-translate-y-0.5 hover:border-gold hover:shadow-[var(--shadow-elevated)] focus-visible:ring-offset-parchment"
          : "border-white/10 bg-white/[0.04] hover:-translate-y-0.5 hover:border-gold-light/60 hover:bg-white/[0.08] focus-visible:ring-offset-navy-deep",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-11 shrink-0 items-center justify-center rounded-xl",
          variant === "light"
            ? "bg-gold/15 text-gold-deep"
            : "bg-white/10 text-gold-light",
        )}
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "font-sans text-[0.96rem] font-semibold leading-snug text-balance",
            variant === "light" ? "text-navy" : "text-white",
          )}
        >
          {title}
        </p>
        {byline && (
          <p
            className={cn(
              "mt-1.5 text-xs",
              variant === "light" ? "text-muted" : "text-white/55",
            )}
          >
            {byline}
          </p>
        )}
      </div>
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
          variant === "light"
            ? "border-navy/15 text-navy/70 group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep"
            : "border-white/20 text-white/80 group-hover:border-gold-light group-hover:bg-gold group-hover:text-navy-deep",
        )}
      >
        <Download className="size-4 transition-transform group-hover:translate-y-0.5" strokeWidth={2} />
      </span>
    </a>
  );
}
