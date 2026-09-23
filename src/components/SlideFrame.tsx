import { useEffect, useRef, useState, type ReactNode } from "react";
import { SLIDE_COUNT, ui, type Slide } from "../content/slides";
import { useDeck } from "./DeckContext";
import { ProgressRail } from "./ProgressRail";
import { Wordmark } from "./Wordmark";

const HINT_MS = 6000;

interface Props {
  slide: Slide;
  index: number;
  className?: string;
  children: ReactNode;
  /** Slide 1 shows its event line in the rail instead of the logo and title. */
  footerText?: string;
}

/** Shows the audit key hint for six seconds after load (brief Section 6.3). */
export function AuditHint({ className }: { className?: string }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setVisible(false), HINT_MS);
    return () => window.clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <p className={className} role="status">
      {ui.auditHint.before} <kbd className="key">{ui.auditHint.key}</kbd> {ui.auditHint.after}
    </p>
  );
}

/** One 1600 by 900 slide: a landmark region with its own footer rail. */
export function SlideFrame({ slide, index, className = "", children, footerText }: Props) {
  const { active, audit, claimsPerSlide, claimsInDeck } = useDeck();
  const isActive = active === index;
  const ref = useRef<HTMLElement>(null);

  // Inactive slides leave the tab order and the accessibility tree.
  useEffect(() => {
    if (ref.current) ref.current.inert = !isActive;
  }, [isActive]);

  return (
    <section
      ref={ref}
      className={`slide ground-${slide.ground} slide--${slide.n} ${className}`}
      aria-label={slide.title}
      aria-hidden={!isActive}
      data-slide={slide.n}
    >
      <div className="slide__body">{children}</div>
      <FooterRail
        slide={slide}
        index={index}
        audit={audit}
        footerText={footerText}
        count={ui.auditCount(claimsPerSlide[index], claimsInDeck)}
      />
    </section>
  );
}

function FooterRail({
  slide,
  index,
  audit,
  footerText,
  count,
}: {
  slide: Slide;
  index: number;
  audit: boolean;
  footerText?: string;
  count: string;
}) {
  return (
    <footer className="rail">
      <div className="rail__start">
        {footerText ? (
          <span className="rail__text">{footerText}</span>
        ) : (
          <>
            <Wordmark ground={slide.ground} width={84} className="rail__logo" />
            <span className="rail__text">{slide.title}</span>
          </>
        )}
      </div>
      <div className="rail__end">
        {audit && <span className="rail__audit">{count}</span>}
        <ProgressRail current={index} />
        <span className="rail__count">{ui.slideOf(slide.n, SLIDE_COUNT)}</span>
      </div>
    </footer>
  );
}
