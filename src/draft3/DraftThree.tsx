import { useEffect, useRef, useState } from "react";
import { assets } from "../content/assets";
import { solutionSlide } from "../content/slides";
import { Claim } from "../components/Claim";
import { DeckShell } from "../components/DeckShell";
import { useDeck } from "../components/DeckContext";
import { AuditHint } from "../components/SlideFrame";
import { Tag } from "../components/Tag";
import { VideoPanel } from "../components/VideoPanel";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { build, Frame } from "./Frame";
import { SlidesSixToTen } from "./SlidesSixToTen";
import { Slide11 } from "./Slide11";
import {
  d3ClaimsInDeck,
  d3ClaimsPerSlide,
  d3Model,
  d3Problem,
  d3Slides,
  d3Solution,
  d3Title,
  d3Value,
} from "./content";
import "./draft3.css";

/** Draft 3: keynote style. One thought per slide. */
export function DraftThree() {
  return (
    <DeckShell slides={d3Slides} claimsPerSlide={d3ClaimsPerSlide} claimsInDeck={d3ClaimsInDeck} className="d3">
      <TitleSlide />
      <ProblemSlide />
      <ValueSlide />
      <SolutionSlide />
      <ModelSlide />
      <SlidesSixToTen />
      <Slide11 />
    </DeckShell>
  );
}

/* ------------------------------------------------------------------ */

function TitleSlide() {
  const c = d3Title;
  return (
    <Frame slide={c} index={0} className={assets.product ? "" : "d3-slide--solo"}>
      <p className="d3-company d3-in" style={build(0)}>
        {c.company}
      </p>
      <AuditHint className="d3-hint" />
      <div className="d3-1__text">
        <h1 className="d3-hero d3-in" style={build(1)}>
          {c.headline}
        </h1>
        <p className="d3-sub d3-in" style={build(2)}>
          {c.subhead}
        </p>
      </div>
      {assets.product && (
        <div className="d3-1__card d3-in" style={build(3)}>
          <img src={assets.product} alt={c.imageAlt} />
        </div>
      )}
      <p className="d3-fine d3-1__honesty d3-in" style={build(4)}>
        {c.honesty}
      </p>
    </Frame>
  );
}

function ProblemSlide() {
  const c = d3Problem;
  return (
    <Frame slide={c} index={1}>
      <div className="d3-center">
        <h2 className="d3-title d3-in" style={build(0)}>
          {c.headline}
        </h2>
        <p className="d3-sub d3-in" style={build(1)}>
          {c.subhead}
        </p>
        <div className="d3-2__pair d3-in" style={build(2)}>
          {c.figures.map((f) => (
            <div key={f.figure}>
              <span className="d3-figure d3-figure--market">{f.figure}</span>
              <span className="d3-figure-label">{f.label}</span>
            </div>
          ))}
        </div>
        <div className="d3-2__evidence d3-in" style={build(3)}>
          <Tag kind="evidence" source={c.evidenceSource} />
          <p className="d3-2__source">{c.sourceNote}</p>
        </div>
      </div>
    </Frame>
  );
}

function ValueSlide() {
  const c = d3Value;
  const { active } = useDeck();
  return (
    <Frame slide={c} index={2}>
      <div className="d3-center">
        <h2 className="d3-title d3-in" style={build(0)}>
          {c.headline}
        </h2>
        <p className="d3-sub d3-in" style={build(1)}>
          {c.subhead}
        </p>
        <div className="d3-in" style={build(2)}>
          <PhScale copy={c.scale} active={active === 2} />
        </div>
      </div>
    </Frame>
  );
}

function SolutionSlide() {
  const c = d3Solution;
  const { active } = useDeck();
  return (
    <Frame slide={c} index={3}>
      <div className="d3-center">
        <div className="d3-in" style={build(0)}>
          <h2 className="d3-title">{c.headline}</h2>
          <p className="d3-4__note">
            <Tag kind="evidence" /> {c.evidenceNote}
          </p>
        </div>
        <div className="d3-4__video d3-in" style={build(1)}>
          <VideoPanel video={solutionSlide.video} active={active === 3} />
        </div>
      </div>
    </Frame>
  );
}

function ModelSlide() {
  const c = d3Model;
  return (
    <Frame slide={c} index={4}>
      <div className="d3-center">
        <h2 className="d3-title d3-in" style={build(0)}>
          {c.headline}
        </h2>
        <div className="d3-5__pair">
          {[
            [c.price, c.priceLabel],
            [c.cost, c.costLabel],
          ].map(([fig, label], i) => {
            const f = fig as typeof c.price;
            return (
              <div key={f.claim} className="d3-in" style={build(1 + i)}>
                <Claim id={f.claim} block>
                  <span className="d3-figure d3-figure--pair">{f.text}</span>
                  <span className="d3-figure-label">{label as string}</span>
                </Claim>
              </div>
            );
          })}
        </div>
        <p className="d3-closer d3-5__closer d3-in" style={build(3)}>
          {c.closerLead} <Claim id={c.closerClaim.claim}>{c.closerClaim.text}</Claim>
        </p>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* The pH scale: two bars, one zone, nothing else                      */
/* ------------------------------------------------------------------ */

const W = 1120;
const px = (ph: number) => ((ph - 5) / 3) * W;
const BAR = 18;
const Y_STD = 74;
const Y_CLAIM = 150;
const Y_AXIS = 204;
const H = Y_AXIS + 34;
const TICKS = [5, 6, 6.5, 7, 8];

function PhScale({ copy, active }: { copy: (typeof d3Value)["scale"]; active: boolean }) {
  const reduced = useReducedMotion();
  const [drawn, setDrawn] = useState(reduced ? 1 : 0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    if (reduced) return setDrawn(1);
    let raf = 0;
    const t0 = performance.now() + 900;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / 1300));
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

  const claimW = px(8) - px(6);

  return (
    <figure className="d3-scale" style={{ width: W, height: H }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={copy.title}>
        <defs>
          <linearGradient id="d3-fade" x1="0" x2="1">
            <stop offset="0" className="d3-fade-a" />
            <stop offset="1" className="d3-fade-b" />
          </linearGradient>
          <clipPath id="d3-draw">
            <rect x={px(6) - 4} y={0} width={(claimW + 8) * drawn} height={H} />
          </clipPath>
        </defs>

        {/* Where customers are: a soft zone behind everything */}
        <rect className="d3-zone" x={px(6)} y={34} width={px(7.2) - px(6)} height={Y_AXIS - 34} rx={14} />

        <rect className="d3-bar-std" x={0} y={Y_STD} width={px(6.5)} height={BAR} rx={BAR / 2} />

        <g clipPath="url(#d3-draw)">
          <rect x={px(6)} y={Y_CLAIM} width={claimW} height={BAR} rx={BAR / 2} fill="url(#d3-fade)" />
          <rect className="d3-bar-claim" x={px(6) + 0.75} y={Y_CLAIM + 0.75} width={claimW - 1.5} height={BAR - 1.5} rx={BAR / 2} />
        </g>

        <line className="d3-axis" x1={0} x2={W} y1={Y_AXIS} y2={Y_AXIS} />
      </svg>

      <span className="d3-scale__label d3-scale__label--zone" style={{ left: px(6) + 14, top: 6 }}>
        {copy.customers}
      </span>
      <span className="d3-scale__label" style={{ left: 0, top: Y_STD - 32 }}>
        {copy.standard}
      </span>
      <span className="d3-scale__label" style={{ left: px(6) + 14, top: Y_CLAIM - 32 }}>
        {copy.claim} <Tag kind="evidence" />
      </span>
      {TICKS.map((t) => (
        <span key={t} className={`d3-scale__tick${t === 6.5 ? " is-key" : ""}${t === 5 ? " is-first" : ""}`} style={{ left: px(t), top: Y_AXIS + 14 }}>
          {t === 5 ? "pH 5" : t % 1 ? t.toFixed(1) : t}
        </span>
      ))}
    </figure>
  );
}
