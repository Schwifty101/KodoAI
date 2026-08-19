import type { SolutionTestimonial } from "@/lib/solutions/types";

/**
 * Infinite testimonial strip. The track holds the list twice, so a CSS
 * translate of exactly -50% loops seamlessly (see `.marquee` in globals.css).
 * Cards carry horizontal margins rather than the track carrying `gap`: with a
 * gap, the seam lands half a gap short and the loop visibly jumps.
 *
 * The second pass is `aria-hidden` so screen readers and search read each quote
 * once. Hover or keyboard focus inside the strip pauses it; under reduced motion
 * the animation is off and the strip becomes a normal horizontal scroller.
 *
 * `quoted={false}` renders scenario copy without quotation marks, for pages
 * that carry labelled operating scenarios rather than attributed quotes.
 */
export default function TestimonialStrip({
  items,
  quoted = true,
  label = "Client testimonials",
}: {
  items: SolutionTestimonial[];
  quoted?: boolean;
  label?: string;
}) {
  return (
    <div className="marquee-wrap li-reveal" tabIndex={0} role="group" aria-label={label}>
      <ul className="marquee list-none">
        {items.map((t) => (
          <Card key={t.name} t={t} quoted={quoted} />
        ))}
        {items.map((t) => (
          <Card key={`${t.name}-dup`} t={t} quoted={quoted} duplicate />
        ))}
      </ul>
    </div>
  );
}

function Card({
  t,
  quoted,
  duplicate = false,
}: {
  t: SolutionTestimonial;
  quoted: boolean;
  duplicate?: boolean;
}) {
  return (
    <li
      aria-hidden={duplicate || undefined}
      className="mx-3 flex w-[min(82vw,440px)] shrink-0 flex-col justify-between border border-border bg-surface p-6 md:p-8"
    >
      <p className="text-[15px] leading-[1.75] text-ink-2">
        {quoted ? <>&ldquo;{t.quote}&rdquo;</> : t.quote}
      </p>

      <div className="mt-8 flex items-center gap-4 border-t border-border pt-5">
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent font-mono text-[11px] tracking-[0.1em] text-accent"
        >
          {initials(t.name)}
        </span>
        <div className="min-w-0">
          <div className="font-display text-base font-bold uppercase tracking-wide text-ink">{t.name}</div>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
            {t.role}, {t.location}
          </div>
        </div>
      </div>
    </li>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}
