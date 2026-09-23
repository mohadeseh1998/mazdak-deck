import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DeckContext, type DeckState, type LightboxImage } from "./components/DeckContext";
import { Lightbox } from "./components/Lightbox";
import { PresenterNotes } from "./components/PresenterNotes";
import { SourcesOverlay } from "./components/SourcesOverlay";
import { Stage, STAGE_W, useStageScale } from "./components/Stage";
import { slides, SLIDE_COUNT, ui } from "./content/slides";
import { useHash } from "./hooks/useHash";
import { TitleSlide } from "./slides/01Title";
import { ProblemSlide } from "./slides/02Problem";
import { ValueSlide } from "./slides/03Value";
import { SolutionSlide } from "./slides/04Solution";
import { ModelSlide } from "./slides/05Model";

const CONTROLS_MS = 2500;

export function App() {
  const scale = useStageScale();
  const [active, go] = useHash(SLIDE_COUNT);
  // Audit mode lives in memory only: it persists across slides and resets on reload.
  const [audit, setAudit] = useState(false);
  const [notes, setNotes] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);
  const [controls, setControls] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const controlsTimer = useRef<number>();

  const openLightbox = useCallback((image: LightboxImage, el: HTMLElement) => {
    trigger.current = el;
    setLightbox(image);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    const el = trigger.current;
    trigger.current = null;
    // Return focus to the thumbnail that opened it.
    window.requestAnimationFrame(() => el?.focus());
  }, []);

  const stageEl = useCallback(() => stageRef.current, []);

  const deck = useMemo<DeckState>(
    () => ({ active, audit, go, openLightbox, stageEl, scale }),
    [active, audit, go, openLightbox, stageEl, scale],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      if (lightbox) return; // the dialog handles its own keys

      const target = e.target as HTMLElement | null;
      // Keys pressed inside the video panel belong to the player, never to the deck.
      const trap = target?.closest?.("[data-keytrap]");
      if (trap) {
        if (e.key === "Escape") {
          e.preventDefault();
          (document.activeElement as HTMLElement | null)?.blur();
          stageRef.current?.focus();
        }
        return;
      }
      const onControl = !!target?.closest?.("button, a, [tabindex]") && target !== stageRef.current;

      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          go(active + 1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          go(active - 1);
          break;
        case " ":
          if (onControl) return; // Space activates the focused button instead
          e.preventDefault();
          go(e.shiftKey ? active - 1 : active + 1);
          break;
        case "Home":
          e.preventDefault();
          go(0);
          break;
        case "End":
          e.preventDefault();
          go(SLIDE_COUNT - 1);
          break;
        case "a":
        case "A":
          setAudit((v) => !v);
          break;
        case "n":
        case "N":
          setNotes((v) => !v);
          break;
        case "s":
        case "S":
          setSourcesOpen((v) => !v);
          break;
        case "Escape":
          setSourcesOpen(false);
          setNotes(false);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go, lightbox]);

  // On-screen controls appear on mouse move and fade after 2.5 seconds.
  const onPointerMove = useCallback(() => {
    setControls(true);
    window.clearTimeout(controlsTimer.current);
    controlsTimer.current = window.setTimeout(() => setControls(false), CONTROLS_MS);
  }, []);

  const current = slides[active];

  return (
    <DeckContext.Provider value={deck}>
      <main className={`deck${audit ? " is-audit" : ""}`} aria-label={ui.deckLabel}>
        <Stage ref={stageRef} scale={scale} onPointerMove={onPointerMove}>
          <div className="track" style={{ transform: `translateX(${-active * STAGE_W}px)` }}>
            <TitleSlide index={0} />
            <ProblemSlide index={1} />
            <ValueSlide index={2} />
            <SolutionSlide index={3} />
            <ModelSlide index={4} />
          </div>

          <div className={`controls ground-${current.ground}${controls ? " is-visible" : ""}`}>
            <button
              type="button"
              className="controls__btn controls__btn--prev"
              aria-label={ui.prev}
              disabled={active === 0}
              onClick={() => go(active - 1)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M13 3 L6 10 L13 17" />
              </svg>
            </button>
            <button
              type="button"
              className="controls__btn controls__btn--next"
              aria-label={ui.next}
              disabled={active === SLIDE_COUNT - 1}
              onClick={() => go(active + 1)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M7 3 L14 10 L7 17" />
              </svg>
            </button>
          </div>

          {notes && <PresenterNotes note={current.notes} n={current.n} />}
          {sourcesOpen && <SourcesOverlay />}
        </Stage>

        <p className="visually-hidden" aria-live="polite">
          {ui.announce(current.n, SLIDE_COUNT, current.title)}
        </p>
        <Lightbox image={lightbox} onClose={closeLightbox} />
      </main>
    </DeckContext.Provider>
  );
}
