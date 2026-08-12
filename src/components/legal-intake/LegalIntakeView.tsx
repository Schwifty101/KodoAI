// src/components/legal-intake/LegalIntakeView.tsx
"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { legalIntakePage } from "@/lib/legalIntake";
import { Eyebrow, Heading } from "@/components/ui/SectionPrimitives";
import BookCallButton from "@/components/ui/BookCallButton";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const SECTION_H =
  "li-reveal font-display text-[clamp(44px,7.5vw,104px)] font-extrabold uppercase leading-[0.88] tracking-tight text-ink";

/**
 * /legal-intake — long-form capability page, same visual pattern as
 * CaseStudyView.tsx (hero → sections → CTA), built on the same
 * Eyebrow/Heading primitives. Reveal: every `.li-reveal` inside a
 * `.li-section` fades up on enter, staggered. Reduced motion: static.
 */
export default function LegalIntakeView() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const p = legalIntakePage;

  useGSAP(
    () => {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.utils.toArray<HTMLElement>(".li-section").forEach((sec) => {
        const items = sec.querySelectorAll(".li-reveal");
        if (!items.length) return;
        gsap.from(items, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: sec, start: "top 82%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <main ref={root} className="depth-band text-ink">
      {/* ═══════════════  HERO  ═══════════════ */}
      <section className="li-section relative overflow-hidden border-b border-border pt-40 pb-24 md:pt-48 md:pb-32">
        <span
          aria-hidden
          className="pointer-events-none absolute left-[-3%] top-[16%] hidden select-none whitespace-nowrap font-display text-[24vw] font-black uppercase leading-[0.8] text-ink opacity-[0.03] lg:block"
        >
          {p.hero.ambient}
        </span>

        <div className="shell relative z-10">
          <Eyebrow className="li-reveal">{p.hero.eyebrow}</Eyebrow>

          <h1 className="li-reveal mt-8 font-display text-[clamp(48px,10vw,128px)] font-black uppercase leading-[0.86] tracking-tight text-ink">
            {p.hero.title}
            <br />
            <span className="text-muted">{p.hero.titleSub}</span>
          </h1>

          <p className="li-reveal mt-10 max-w-3xl text-[17px] leading-relaxed text-ink-2 md:text-xl">
            {p.hero.lead}
          </p>

          <div className="li-reveal mt-10 flex flex-wrap items-center gap-4">
            <BookCallButton>{p.hero.primaryCta}</BookCallButton>
            <Button href="#orchestration-layer" arrow>
              {p.hero.secondaryCta}
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════  CAPABILITIES  ═══════════════ */}
      <section className="li-section border-b border-border py-24 md:py-32">
        <div className="shell">
          <Eyebrow className="li-reveal mb-6">{p.capabilitiesEyebrow}</Eyebrow>
          <Heading h={p.capabilitiesHeading} className={SECTION_H} />

          <div className="mt-16 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
            {p.capabilities.map((c) => (
              <div
                key={c.num}
                className="li-reveal group border border-border bg-surface p-6 transition-colors hover:border-accent md:p-8"
              >
                <span className="font-mono text-[11px] tracking-[0.35em] text-ink-3">{c.num}</span>
                <h3 className="mt-4 font-display text-2xl font-extrabold uppercase text-ink transition-colors group-hover:text-accent md:text-3xl">
                  {c.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════  ORCHESTRATION LAYER (table)  ═══════════════ */}
      <section id="orchestration-layer" className="li-section border-b border-border py-24 md:py-32">
        <div className="shell">
          <Eyebrow className="li-reveal mb-6">{p.orchestration.eyebrow}</Eyebrow>
          <Heading h={p.orchestration.heading} className={SECTION_H} />

          <div className="li-reveal mt-14 overflow-x-auto border border-border">
            <table className="w-full min-w-[720px] border-collapse font-mono text-sm">
              <thead>
                <tr className="border-b border-border bg-surface text-left uppercase tracking-widest text-ink-3">
                  <th className="p-4 text-xs font-medium">{p.orchestration.columns.stage}</th>
                  <th className="p-4 text-xs font-medium">{p.orchestration.columns.whatHappens}</th>
                  <th className="p-4 text-xs font-medium">{p.orchestration.columns.controlPoint}</th>
                </tr>
              </thead>
              <tbody>
                {p.orchestration.rows.map((r) => (
                  <tr key={r.stage} className="border-b border-border last:border-b-0">
                    <td className="p-4 align-top font-semibold uppercase tracking-wide text-ink">{r.stage}</td>
                    <td className="p-4 align-top text-ink-2">{r.whatHappens}</td>
                    <td className="p-4 align-top text-accent">{r.controlPoint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════  FIT  ═══════════════ */}
      <section className="li-section border-b border-border py-24 md:py-32">
        <div className="shell">
          <Eyebrow className="li-reveal mb-6">{p.fit.eyebrow}</Eyebrow>
          <p className="li-reveal max-w-3xl text-base leading-relaxed text-ink-2">{p.fit.intro}</p>

          <div className="mt-14 grid grid-cols-1 gap-0 md:grid-cols-3">
            {p.fit.industries.map((ind) => (
              <div
                key={ind.title}
                className="li-reveal group border border-border bg-surface p-6 transition-colors hover:border-accent md:p-8"
              >
                <h3 className="font-display text-xl font-extrabold uppercase text-ink transition-colors group-hover:text-accent md:text-2xl">
                  {ind.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{ind.description}</p>
              </div>
            ))}
          </div>

          <p className="li-reveal mt-10 max-w-2xl text-sm text-ink-3">{p.fit.notRightFit}</p>
        </div>
      </section>

      {/* ═══════════════  CTA  ═══════════════ */}
      <section className="li-section py-24 text-center md:py-36">
        <div className="shell">
          <Eyebrow className="li-reveal mb-6 justify-center">{"// LET'S TALK"}</Eyebrow>
          <Heading
            h={p.cta.heading}
            className="li-reveal mx-auto font-display text-[clamp(48px,9vw,120px)] font-black uppercase leading-[0.86] tracking-tight text-ink"
          />
          <p className="li-reveal mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink-2">{p.cta.body}</p>
          <div className="li-reveal mt-12 flex justify-center">
            <BookCallButton>{p.cta.label}</BookCallButton>
          </div>
        </div>
      </section>
    </main>
  );
}
