import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useDeck } from "../components/DeckContext";
import { ui } from "../content/slides";
import type { D3Slide } from "./content";

/** A Draft 3 slide: the black stage and the faint dots, shared by all ten slides. */
export function Frame({ slide, index, className = "", children }: { slide: D3Slide; index: number; className?: string; children: ReactNode }) {
  const { active, audit, go, claimsPerSlide, claimsInDeck } = useDeck();
  const isActive = active === index;
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.inert = !isActive;
  }, [isActive]);

  return (
    <section
      ref={ref}
      className={`slide d3-slide d3-slide--${slide.n} ground-${slide.ground} ${className}`}
      aria-label={slide.title}
      aria-hidden={!isActive}
      data-slide={slide.n}
    >
      {children}
      <footer className="d3-foot">
        {audit && <span className="d3-foot__audit">{ui.auditCount(claimsPerSlide[index], claimsInDeck)}</span>}
        <nav className="d3-dots" aria-label="Slides">
          {claimsPerSlide.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`d3-dot${i === index ? " is-current" : ""}`}
              aria-label={ui.slideOf(i + 1, claimsPerSlide.length)}
              aria-current={i === index ? "step" : undefined}
              onClick={() => go(i)}
            />
          ))}
        </nav>
      </footer>
    </section>
  );
}

/** Builds in with the slide, like a keynote build. `step` staggers the order. */
export const build = (step: number): CSSProperties => ({ ["--step" as string]: step });
