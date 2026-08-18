"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { solutions, solutionsTeaser } from "@/lib/solutions";
import { Eyebrow } from "@/components/ui/SectionPrimitives";
import Hairline from "@/components/ui/Hairline";
import Button from "@/components/ui/Button";
import BookCallButton from "@/components/ui/BookCallButton";

gsap.registerPlugin(ScrollTrigger);

/**
 * Homepage chooser for the solution pages (#solutions): one heading over a
 * column per vertical, each a short pointer to its own long-form page. The
 * columns are driven by `solutions`, so a new vertical shows up here by adding
 * its data file, not by editing this layout.
 *
 * Columns carry their own borders inside a `gap-0` grid, matching the card grids
 * on the solution pages. Reveal matches the Services/FAQ enter convention.
 * Reduced motion: static.
 */
export default function SolutionsTeaser() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".sol-reveal", {
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
    <section ref={root} id="solutions" className="relative py-24 md:py-32">
      <Hairline className="absolute inset-x-0 top-0" />
      <div className="shell">
        <Eyebrow className="sol-reveal">{solutionsTeaser.eyebrow}</Eyebrow>

        <h2 className="sol-reveal mt-6 max-w-[20ch] font-display text-[clamp(36px,6vw,72px)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink">
          {solutionsTeaser.heading}
        </h2>

        <p className="sol-reveal mt-8 max-w-3xl text-base leading-relaxed text-ink-2 md:text-lg">
          {solutionsTeaser.intro}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-0 md:grid-cols-2">
          {solutions.map((s) => (
            <article
              key={s.slug}
              className="sol-reveal group flex flex-col border border-border bg-surface p-6 transition-colors hover:border-accent md:p-10"
            >
              <Eyebrow>{s.teaser.eyebrow}</Eyebrow>

              <h3 className="mt-5 font-display text-[clamp(28px,3.4vw,44px)] font-extrabold uppercase leading-[0.95] tracking-tight text-ink transition-colors group-hover:text-accent">
                {s.teaser.title}
              </h3>

              <p className="mt-5 text-[15px] leading-relaxed text-ink-2">{s.teaser.body}</p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {s.teaser.capabilities.map((c) => (
                  <li key={c} className="badge accent">
                    {`// ${c}`}
                  </li>
                ))}
              </ul>

              {/* mt-auto pins the link to the bottom, so both columns' CTAs line
                  up however unevenly the copy above them wraps. */}
              <div className="mt-auto pt-9">
                <Button href={`/${s.slug}`} arrow>
                  {s.teaser.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="sol-reveal mt-10">
          <BookCallButton>{solutionsTeaser.cta}</BookCallButton>
        </div>
      </div>
    </section>
  );
}
