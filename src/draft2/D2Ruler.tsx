import { useEffect, useRef, useState } from "react";
import { Claim } from "../components/Claim";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { d2Value } from "./content";

// Stage-pixel geometry: labels on the left, the pH scale on the right.
const LABEL_W = 330;
const CHART_W = 1014;
const WIDTH = LABEL_W + CHART_W;
const ROW_H = 58;
const BAR_H = 14;
const TOP = 34;
const PH_MIN = 5;
const PH_MAX = 8;
const x = (ph: number) => LABEL_W + ((ph - PH_MIN) / (PH_MAX - PH_MIN)) * CHART_W;
const rowY = (i: number) => TOP + i * ROW_H;
const AXIS_Y = rowY(4) + 6;
const HEIGHT = AXIS_Y + 30;
const TICKS = [5, 5.5, 6, 6.5, 7, 7.5, 8];

type Copy = (typeof d2Value)["ruler"];

/** Draft 2 pH chart: four quiet rows, one claim that fades out to the right. */
export function D2Ruler({ copy, active }: { copy: Copy; active: boolean }) {
  const reduced = useReducedMotion();
  const [drawn, setDrawn] = useState(reduced ? 1 : 0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    if (reduced) return setDrawn(1);
    let raf = 0;
    const t0 = performance.now() + 350;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / 1100));
      setDrawn(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced]);

  useEffect(() => {
    const done = () => setDrawn(1);
    window.addEventListener("beforeprint", done);
    return () => window.removeEventListener("beforeprint", done);
  }, []);

  const barY = (i: number) => rowY(i) + (ROW_H - BAR_H) / 2 - 8;
  const claimRow = copy.rows.findIndex((r) => r.kind === "claim");
  const claim = copy.rows[claimRow];

  return (
    <figure className="d2-ruler" style={{ width: WIDTH, height: HEIGHT }}>
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-labelledby="d2r-t d2r-d">
        <title id="d2r-t">{copy.title}</title>
        <desc id="d2r-d">{copy.desc}</desc>
        <defs>
          <pattern id="d2-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" className="d2-hatch" />
          </pattern>
          <linearGradient id="d2-fade" x1="0" x2="1">
            <stop offset="0" className="d2-fade-a" />
            <stop offset="1" className="d2-fade-b" />
          </linearGradient>
          <clipPath id="d2-draw">
            <rect x={x(claim.from) - 4} y={0} width={(x(claim.to) - x(claim.from) + 8) * drawn} height={HEIGHT} />
          </clipPath>
        </defs>

        {TICKS.map((t) => (
          <line key={t} className="d2-grid" x1={x(t)} x2={x(t)} y1={TOP} y2={AXIS_Y - 8} />
        ))}
        <line className="d2-grid d2-grid--problem" x1={x(6)} x2={x(6)} y1={TOP - 10} y2={AXIS_Y - 8} />
        <line className="d2-grid d2-grid--standard" x1={x(6.5)} x2={x(6.5)} y1={TOP - 10} y2={AXIS_Y - 8} />

        {copy.rows.map((r, i) => {
          const common = { x: x(r.from), y: barY(i), width: x(r.to) - x(r.from), height: BAR_H, rx: BAR_H / 2 };
          if (r.kind === "claim") {
            return (
              <g key={r.kind} clipPath="url(#d2-draw)">
                <rect {...common} fill="url(#d2-fade)" />
                <rect {...common} className="d2-bar--claim-line" />
              </g>
            );
          }
          return <rect key={r.kind} {...common} className={`d2-bar--${r.kind}`} fill={r.kind === "drift" ? "url(#d2-hatch)" : undefined} />;
        })}
      </svg>

      <div className="d2-ruler__labels">
        {copy.rows.map((r, i) => (
          <div key={r.kind} className={`d2-ruler__row d2-ruler__row--${r.kind}`} style={{ top: rowY(i) - 8, height: ROW_H }}>
            <span className="d2-ruler__name">
              {r.claim ? <Claim id={r.claim}>{r.text}</Claim> : r.text}
            </span>
            <span className="d2-ruler__range">{r.range}</span>
          </div>
        ))}
        <span className="d2-ruler__grid-label d2-ruler__grid-label--problem" style={{ left: x(6) - 8, top: 0 }}>
          {copy.gridProblem}
        </span>
        <span className="d2-ruler__grid-label" style={{ left: x(6.5) + 8, top: 0 }}>
          {copy.gridStandard}
        </span>
        {TICKS.map((t) => (
          <span key={t} className="d2-ruler__tick" style={{ left: x(t), top: AXIS_Y }}>
            {t.toFixed(1)}
          </span>
        ))}
      </div>
    </figure>
  );
}
