"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { governance, governanceEyebrow, governanceHeading, governanceIntro } from "@/lib/content";
import Hairline from "@/components/ui/Hairline";

gsap.registerPlugin(ScrollTrigger);

/**
 * Trust/safety principles as a 5-card grid — the first card-grid look in the
 * main scroll (elsewhere it's subpage-only, see CaseStudyView's FeatureCard).
 * Reveal matches the Services/FAQ enter convention. Reduced motion: static.
 */
export default function Governance() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".gov-head", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
      gsap.from(".gov-card", {
        opacity: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gov-grid", start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="governance" className="relative py-24 md:py-32">
      <Hairline className="absolute inset-x-0 top-0" />
      <div className="shell">
        <div className="gov-head">
          <p className="eyebrow flex items-center gap-2">
            <span className="h-[8px] w-[8px] bg-accent" aria-hidden />
            {governanceEyebrow}
          </p>
          <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(36px,5.5vw,64px)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
            {governanceHeading.lead}{" "}
            <span className="text-accent">{governanceHeading.accent}</span>
          </h2>
          <p className="mt-6 max-w-[60ch] text-ink-2">{governanceIntro}</p>
        </div>

        <div className="gov-grid mt-16 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
          {governance.map((g, i) => (
            <div
              key={g.title}
              className="gov-card group border border-border bg-surface p-6 transition-colors hover:border-accent md:p-8"
            >
              <span className="font-mono text-[11px] tracking-[0.35em] text-ink-3">{`0${i + 1}`}</span>
              <h3 className="mt-4 font-display text-xl font-extrabold uppercase text-ink transition-colors group-hover:text-accent md:text-2xl">
                {g.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-2">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
