"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { legalIntakeTeaser } from "@/lib/legalIntake";
import Hairline from "@/components/ui/Hairline";
import Button from "@/components/ui/Button";
import BookCallButton from "@/components/ui/BookCallButton";

gsap.registerPlugin(ScrollTrigger);

/**
 * Homepage teaser for the Legal Intake capability. Condensed pointer to the
 * full /legal-intake page: eyebrow, heading, two short paragraphs, capability
 * chips, both CTAs. Reveal matches the Services/FAQ enter convention.
 * Reduced motion: static.
 */
export default function LegalIntakeTeaser() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".li-teaser-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="legal-intake" className="relative py-24 md:py-32">
      <Hairline className="absolute inset-x-0 top-0" />
      <div className="shell">
        <p className="li-teaser-reveal eyebrow flex items-center gap-2">
          <span className="h-[8px] w-[8px] bg-accent" aria-hidden />
          {legalIntakeTeaser.eyebrow}
        </p>
        <h2 className="li-teaser-reveal mt-6 max-w-[22ch] font-display text-[clamp(36px,6vw,72px)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
          {legalIntakeTeaser.heading}
        </h2>

        <div className="li-teaser-reveal mt-8 flex max-w-3xl flex-col gap-5">
          {legalIntakeTeaser.body.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-ink-2 md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="li-teaser-reveal mt-8 flex flex-wrap gap-2">
          {legalIntakeTeaser.capabilities.map((c) => (
            <li key={c} className="badge accent">
              {`// ${c}`}
            </li>
          ))}
        </ul>

        <div className="li-teaser-reveal mt-10 flex flex-wrap items-center gap-4">
          <BookCallButton>{legalIntakeTeaser.primaryCta}</BookCallButton>
          <Button href="/legal-intake" arrow>
            {legalIntakeTeaser.secondaryCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
