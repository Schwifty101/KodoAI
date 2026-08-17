import type { IntakeFlowStage } from "@/lib/legalIntake";
import { legalIntakePage } from "@/lib/legalIntake";

const f = legalIntakePage.flow;

/**
 * The inbound/intake agent perimeter as a top-down flow diagram: inbound demand
 * → three agent stages → one unified record → across the boundary into the
 * firm's core system. A left-hand dashed bracket draws the re-engagement loop
 * back up into stage 01 (lg and up; the same information is spelled out in the
 * caption below the stages at every width).
 *
 * Pure layout, no JS: the geometry is hairline borders, and every node is real
 * text so it stays readable and searchable. The `.li-reveal` hooks let
 * LegalIntakeView's section reveal stagger the blocks; under reduced motion that
 * reveal early-returns and the diagram renders static.
 *
 * Each stage is a centred label with its agents as separate, detached boxes
 * underneath: the agents inside a stage are peers doing one job each, so they
 * read as siblings rather than rows of one enclosing container.
 */
export default function IntakeFlowDiagram() {
  return (
    <figure className="mt-14 md:mt-16">
      <figcaption className="sr-only">{f.caption}</figcaption>

      {/* ── inbound demand ───────────────────────────────────────────────── */}
      {/* Everything outside the loop bracket carries the rail's own width as a
          left offset (lg:ml-16), so the whole flow shares one left edge and the
          bracket hangs off it. */}
      <div className="lg:ml-16">
        <p className="li-reveal text-center font-mono text-[10px] tracking-[0.3em] text-ink-3">
          {f.source.label}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {f.source.items.map((item) => (
            <div
              key={item}
              className="li-reveal border border-border bg-surface px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink-2"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="lg:ml-16">
        <Connector />
      </div>

      {/* ── the three agent stages, wrapped by the re-engagement bracket ─── */}
      <div className="flex items-stretch">
        <div
          aria-hidden
          className="relative hidden w-16 shrink-0 border-y-2 border-l-2 border-dashed border-accent-dim lg:block"
        >
          {/* arrowhead: sits on the top line's right end, pointing into stage 01 */}
          <span className="absolute right-0 top-0 h-[11px] w-[11px] -translate-y-1/2 translate-x-1/2 rotate-45 border-r-2 border-t-2 border-accent" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-ink-3 [writing-mode:vertical-rl] rotate-180">
            {f.loop.label}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          {f.stages.map((stage, i) => (
            <div key={stage.num}>
              {i > 0 && <Connector />}
              <Stage stage={stage} />
            </div>
          ))}
        </div>
      </div>

      <div className="lg:ml-16">
        <p className="li-reveal mx-auto mt-6 flex max-w-[80ch] justify-center gap-3 text-center font-mono text-[11px] leading-relaxed text-ink-3">
          <span aria-hidden className="text-accent">
            &#8635;
          </span>
          {f.loop.detail}
        </p>
      </div>

      <div className="lg:ml-16">
        <Connector />
      </div>

      {/* ── convergence: the one record every stage writes to ────────────── */}
      <div className="li-reveal border border-accent bg-surface p-5 md:p-6 lg:ml-16">
        <div className="grid gap-3 md:grid-cols-12 md:items-center md:gap-8">
          <div className="md:col-span-4">
            <span className="font-mono text-[10px] tracking-[0.3em] text-accent">{f.record.eyebrow}</span>
            <h3 className="mt-2 font-display text-xl font-extrabold uppercase tracking-wide text-ink md:text-2xl">
              {f.record.title}
            </h3>
          </div>
          <p className="text-[13px] leading-relaxed text-ink-2 md:col-span-8">{f.record.detail}</p>
        </div>
      </div>

      <div className="lg:ml-16">
        <Connector />
      </div>

      {/* ── boundary: past here it is the firm's system, not an agent ────── */}
      {/* Dashed boxes carry the "not ours, and not an agent" reading; the steps
          are numbered rather than joined by arrows, so the sequence survives the
          wrap to one column without an arrow orphaned at the start of a line. */}
      <div className="lg:ml-16">
        <p className="li-reveal text-center font-mono text-[10px] tracking-[0.3em] text-ink-3">
          {f.core.eyebrow}
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {f.core.steps.map((step, i) => (
            <div key={step} className="li-reveal border border-dashed border-border-2 p-5 text-center">
              <span className="font-mono text-[10px] tracking-[0.35em] text-muted">{`0${i + 1}`}</span>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-ink-2">{step}</p>
            </div>
          ))}
        </div>
        <p className="li-reveal mx-auto mt-6 max-w-[70ch] text-center text-[13px] leading-relaxed text-ink-3">
          {f.core.detail}
        </p>
      </div>
    </figure>
  );
}

/** One stage: centred label, then its agents as separate detached boxes. */
function Stage({ stage }: { stage: IntakeFlowStage }) {
  return (
    <div>
      <div className="li-reveal flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 text-center">
        <span className="font-mono text-[11px] tracking-[0.35em] text-accent">{stage.num}</span>
        <h3 className="font-display text-xl font-extrabold uppercase tracking-wide text-ink md:text-2xl">
          {stage.title}
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">{stage.caption}</span>
      </div>

      <div
        className={`mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 ${
          stage.nodes.length >= 4 ? "lg:grid-cols-4" : ""
        }`}
      >
        {stage.nodes.map((node) => (
          <div
            key={node.title}
            className="li-reveal border border-border bg-surface p-5 transition-colors hover:border-accent"
          >
            <div className="flex items-center gap-2">
              <span aria-hidden className="h-[6px] w-[6px] shrink-0 bg-accent" />
              <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink">
                {node.title}
              </h4>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-2">{node.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Vertical run between two blocks, with a chevron at the downstream end.
 *
 * The line and head are stacked in normal flow (not absolutely positioned past
 * the container's edge), so a following block with its own background can never
 * paint over the head; `z-10` keeps it above neighbouring surfaces regardless.
 * The bottom padding is the gap between the head and the heading below it.
 */
function Connector() {
  return (
    <div aria-hidden className="relative z-10 flex flex-col items-center pb-8">
      <span className="block h-12 w-[2px] bg-accent-dim md:h-16" />
      <span className="-mt-[6px] h-[11px] w-[11px] rotate-45 border-b-2 border-r-2 border-accent" />
    </div>
  );
}
