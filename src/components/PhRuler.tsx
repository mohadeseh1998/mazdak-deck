import { useEffect, useRef, useState } from "react";
import type { ValueSlide } from "../content/slides";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Claim } from "./Claim";
import { RichText } from "./RichText";

// Geometry in stage pixels (brief Section 7.1).
const PH_MIN = 5.0;
const PH_MAX = 8.0;
const SCALE_W = 1200;
const WIDTH = 1408;
const BAND_H = 34;
const BAND_GAP = 12;
const TOP = 30;
const x = (ph: number) => ((ph - PH_MIN) / (PH_MAX - PH_MIN)) * SCALE_W;
const bandY = (i: number) => TOP + i * (BAND_H + BAND_GAP);
const STACK_BOTTOM = bandY(3) + BAND_H;
const AXIS_Y = STACK_BOTTOM + 12;
export const RULER_H = AXIS_Y + 36;

const DRAW_MS = 900;
const DRAW_DELAY = 200;

const TICKS = Array.from({ length: 31 }, (_, i) => Math.round((PH_MIN + i * 0.1) * 10) / 10);
const LABELLED = [5.0, 5.4, 6.0, 6.5, 7.2, 8.0];

interface Props {
  copy: ValueSlide["ruler"];
  active: boolean;
}

export function PhRuler({ copy, active }: Props) {
  const reduced = useReducedMotion();
  const [drawn, setDrawn] = useState(reduced ? 1 : 0);
  const started = useRef(false);

  // Band 4 draws itself once, the first time the slide becomes active.
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    if (reduced) {
      setDrawn(1);
      return;
    }
    let raf = 0;
    const t0 = performance.now() + DRAW_DELAY;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / DRAW_MS));
      setDrawn(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced]);

  // Printing always shows the finished ruler.
  useEffect(() => {
    const done = () => setDrawn(1);
    window.addEventListener("beforeprint", done);
    return () => window.removeEventListener("beforeprint", done);
  }, []);

  const claimW = x(8.0) - x(6.0);

  return (
    <figure className="ruler" style={{ width: WIDTH, height: RULER_H }}>
      <svg
        className="ruler__svg"
        width={WIDTH}
        height={RULER_H}
        viewBox={`0 0 ${WIDTH} ${RULER_H}`}
        role="img"
        aria-labelledby="ruler-title ruler-desc"
      >
        <title id="ruler-title">{copy.title}</title>
        <desc id="ruler-desc">{copy.desc}</desc>
        <defs>
          <pattern id="ruler-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="6" height="6" fill="transparent" />
            <line x1="0" y1="0" x2="0" y2="6" className="hatch-line" />
          </pattern>
          {/* The only gradient in the build: the unproven claim fading to nothing. */}
          <linearGradient id="ruler-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" className="fade-start" />
            <stop offset="1" className="fade-end" />
          </linearGradient>
          <clipPath id="ruler-draw">
            <rect x={x(6.0) - 2} y={bandY(3) - 2} width={(claimW + 4) * drawn} height={BAND_H + 4} />
          </clipPath>
        </defs>

        {/* Band 1: crop requirement, proven */}
        <rect className="band band--crop" x={x(5.4)} y={bandY(0)} width={x(6.0) - x(5.4)} height={BAND_H} />
        {/* Band 2: standard chelate range, proven */}
        <rect
          className="band band--standard"
          x={x(5.0) + 0.5}
          y={bandY(1) + 0.5}
          width={x(6.5) - x(5.0) - 1}
          height={BAND_H - 1}
        />
        {/* Band 3: the customer's drifted media, the problem */}
        <rect
          className="band band--drift"
          x={x(6.0)}
          y={bandY(2)}
          width={x(7.2) - x(6.0)}
          height={BAND_H}
          fill="url(#ruler-hatch)"
        />
        {/* Band 4: our claimed range, unproven */}
        <g clipPath="url(#ruler-draw)">
          <rect className="band band--claim-fill" x={x(6.0)} y={bandY(3)} width={claimW} height={BAND_H} fill="url(#ruler-fade)" />
          <rect className="band band--claim-line" x={x(6.0) + 1} y={bandY(3) + 1} width={claimW - 2} height={BAND_H - 2} />
        </g>

        {/* Gridlines */}
        <line className="grid grid--problem" x1={x(6.0) + 0.5} x2={x(6.0) + 0.5} y1={20} y2={STACK_BOTTOM + 6} />
        <line className="grid grid--standard" x1={x(6.5) + 0.5} x2={x(6.5) + 0.5} y1={20} y2={STACK_BOTTOM + 6} />

        {/* Axis */}
        <line className="axis" x1={0} x2={SCALE_W} y1={AXIS_Y + 0.5} y2={AXIS_Y + 0.5} />
        {TICKS.map((t) => {
          const major = LABELLED.includes(t);
          return (
            <line
              key={t}
              className={major ? "tick tick--major" : "tick"}
              x1={x(t) + 0.5}
              x2={x(t) + 0.5}
              y1={AXIS_Y}
              y2={AXIS_Y + (major ? 10 : 5)}
            />
          );
        })}
      </svg>

      {/* HTML labels positioned over the SVG, in the same stage-pixel space */}
      <div className="ruler__labels" aria-hidden="true">
        <span className="ruler__grid-label ruler__grid-label--problem" style={{ left: x(6.0) + 8, top: 0 }}>
          {copy.gridProblem}
        </span>
        <span className="ruler__grid-label" style={{ left: x(6.5) + 8, top: 0 }}>
          {copy.gridStandard}
        </span>
        <span className="ruler__band-label ruler__band-label--knockout" style={{ left: x(6.0) + 12, top: bandY(0) }}>
          <Claim kind="evidence">{copy.crop}</Claim>
        </span>
        <span className="ruler__band-label" style={{ left: x(6.5) + 12, top: bandY(1) }}>
          <Claim kind="evidence">{copy.standard}</Claim>
        </span>
        <span className="ruler__band-label" style={{ left: x(7.2) + 12, top: bandY(2) }}>
          {copy.drift}
        </span>
        {LABELLED.map((t) => (
          <span key={t} className="ruler__tick-label" style={{ left: x(t), top: AXIS_Y + 14 }}>
            {t === PH_MIN ? `pH ${t.toFixed(1)}` : t.toFixed(1)}
          </span>
        ))}
      </div>
      {/* The claim label stays in the accessibility tree: it is focusable and opens its proof card. */}
      <span className="ruler__band-label ruler__band-label--claim" style={{ left: 0, top: bandY(3) }}>
        <RichText value={[copy.claimed]} />
      </span>

      <figcaption className="visually-hidden">
        <ul>
          {copy.textEquivalent.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
