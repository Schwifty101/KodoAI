import type { CSHeading } from "@/lib/caseStudies";

/**
 * Mono `//` label with the accent bar. Shared by CaseStudyView and
 * SolutionView — both are long-form deep-dive pages built on the same
 * visual language.
 */
export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`eyebrow flex items-center gap-2 ${className}`}>
      <span className="h-[8px] w-[8px] bg-accent" aria-hidden />
      {children}
    </p>
  );
}

/** Multi-line display heading; the tail line is accent or muted. */
export function Heading({ h, className = "" }: { h: CSHeading; className?: string }) {
  return (
    <h2 className={className}>
      {h.lead.map((l) => (
        <span key={l} className="block">
          {l}
        </span>
      ))}
      <span className={`block ${h.tailAccent ? "text-accent" : "text-muted"}`}>{h.tail}</span>
    </h2>
  );
}
