import { useEffect, useRef, type ReactNode } from "react";
import { useDeck } from "../components/DeckContext";
import { ui } from "../content/slides";
import type { D2Slide } from "./content";

interface Props {
  slide: D2Slide;
  index: number;
  children: ReactNode;
  className?: string;
  /** The title slide carries no footer mark. */
  bare?: boolean;
}

/** A Draft 2 slide: generous margins, and a footer that stays out of the way. */
export function D2Frame({ slide, index, children, className = "", bare }: Props) {
  const { active, audit, go, claimsPerSlide, claimsInDeck } = useDeck();
  const isActive = active === index;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.inert = !isActive;
  }, [isActive]);

  return (
    <section
      ref={ref}
      className={`slide d2-slide d2-slide--${slide.n} ground-${slide.ground} ${className}`}
      aria-label={slide.title}
      aria-hidden={!isActive}
      data-slide={slide.n}
    >
      {children}
      <footer className="d2-foot">
        <span className="d2-foot__mark">{bare ? "" : ui.companyName}</span>
        <span className="d2-foot__end">
          {audit && <span className="d2-foot__audit">{ui.auditCount(claimsPerSlide[index], claimsInDeck)}</span>}
          <nav className="d2-dots" aria-label="Slides">
            {claimsPerSlide.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`d2-dot${i === index ? " is-current" : ""}`}
                aria-label={ui.slideOf(i + 1, claimsPerSlide.length)}
                aria-current={i === index ? "step" : undefined}
                onClick={() => go(i)}
              />
            ))}
          </nav>
        </span>
      </footer>
    </section>
  );
}
