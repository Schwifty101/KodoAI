"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  engagementEyebrow,
  engagementHeading,
  engagementIntro,
  engagementSteps,
  engagementSelectivity,
} from "@/lib/content";
import Hairline from "@/components/ui/Hairline";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

/**
 * Three-step offer structure (audit, pilot, production) as full-width rows,
 * closing on the selectivity line. Reveal matches the Services/FAQ enter
 * convention. Reduced motion: static.
 *
 * Row CTAs use the plain outline Button (not BookCallButton) on purpose:
 * three solid accent buttons stacked in three consecutive rows would be
 * visually heavy this far from the bottom of the page. The `.btn.primary`
 * treatment stays reserved for each section's one real conversion moment.
 */
export default function EngagementModel() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".eng-head", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
      gsap.from(".eng-row", {
        opacity: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".eng-list", start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="engagement" className="relative py-24 md:py-32">
      <Hairline className="absolute inset-x-0 top-0" />
      <div className="shell">
        <div className="eng-head">
          <p className="eyebrow flex items-center gap-2">
            <span className="h-[8px] w-[8px] bg-accent" aria-hidden />
            {engagementEyebrow}
          </p>
          <h2 className="mt-6 max-w-[24ch] font-display text-[clamp(36px,5.5vw,64px)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
            {engagementHeading.lead}{" "}
            <span className="text-accent">{engagementHeading.accent}</span>
          </h2>
          <p className="mt-6 max-w-[60ch] text-ink-2">{engagementIntro}</p>
        </div>

        <div className="eng-list mt-16 flex flex-col">
          {engagementSteps.map((s) => (
            <div key={s.n} className="eng-row border-b border-border first:border-t">
              <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-8">
                <div className="flex items-start gap-4 md:col-span-5">
                  <span className="mt-1 shrink-0 font-mono text-xs tracking-[0.3em] text-ink-3">{s.n}</span>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-ink md:text-3xl">
                    {s.title}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-[15px] leading-relaxed text-ink-2">{s.desc}</p>
                  <Button href="#footer" arrow className="mt-4">
                    {s.ctaLabel}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-[70ch] text-ink-3">{engagementSelectivity}</p>
      </div>
    </section>
  );
}
