import { assets } from "../content/assets";
import { solutionSlide } from "../content/slides";
import { AuditHint } from "../components/SlideFrame";
import { Claim } from "../components/Claim";
import { DeckShell } from "../components/DeckShell";
import { useDeck } from "../components/DeckContext";
import { RichText } from "../components/RichText";
import { VideoPanel } from "../components/VideoPanel";
import { ZoomImage } from "../components/ZoomImage";
import { D2Frame } from "./D2Frame";
import { D2Ruler } from "./D2Ruler";
import { Stat } from "./Stat";
import {
  d2ClaimsInDeck,
  d2ClaimsPerSlide,
  d2Model,
  d2Problem,
  d2Slides,
  d2Solution,
  d2Title,
  d2Value,
} from "./content";
import "./draft2.css";

/** Draft 2: the streamlined revision. */
export function DraftTwo() {
  return (
    <DeckShell slides={d2Slides} claimsPerSlide={d2ClaimsPerSlide} claimsInDeck={d2ClaimsInDeck} className="d2">
      <TitleSlide />
      <ProblemSlide />
      <ValueSlide />
      <SolutionSlide />
      <ModelSlide />
    </DeckShell>
  );
}

function TitleSlide() {
  const c = d2Title;
  return (
    <D2Frame slide={c} index={0} bare className={assets.product ? "" : "d2-slide--solo"}>
      <div className="d2-1__text">
        <p className="d2-company">{c.company}</p>
        <AuditHint className="d2-hint" />
        <div className="d2-1__hero">
          <h1 className="d2-display">{c.headline}</h1>
          <p className="d2-subhead">{c.subhead}</p>
        </div>
        <div className="d2-1__proof">
          {c.proof.map((s) => (
            <Stat key={s.figure} stat={s} proven />
          ))}
        </div>
        <p className="d2-honesty">{c.honesty}</p>
      </div>
      {assets.product && (
        <div className="d2-1__image">
          <img src={assets.product} alt={c.imageAlt} />
        </div>
      )}
    </D2Frame>
  );
}

function ProblemSlide() {
  const c = d2Problem;
  const { low, high } = c.cost.cropShare;
  return (
    <D2Frame slide={c} index={1}>
      <div className="d2-body">
        <h2 className="d2-title">{c.headline}</h2>
        <p className="d2-subhead d2-2__sub">{c.subhead}</p>
        <div className="d2-2__cost">
          <Stat stat={c.cost.total} />
          <div className="d2-2__bar" aria-hidden="true">
            <svg width="100%" height="14">
              <defs>
                <pattern id="d2-cost-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="7" className="d2-hatch d2-hatch--cost" />
                </pattern>
                <clipPath id="d2-cost-round">
                  <rect x="0" y="0" width="100%" height="14" rx="7" />
                </clipPath>
              </defs>
              <g clipPath="url(#d2-cost-round)">
                <rect className="d2-cost-crop" x="0" y="0" width={`${high}%`} height="14" />
                <rect x="0" y="0" width={`${high}%`} height="14" fill="url(#d2-cost-hatch)" />
                <rect className="d2-cost-zone" x={`${low}%`} y="0" width={`${high - low}%`} height="14" />
                <rect className="d2-cost-spend" x={`${high}%`} y="0" width={`${100 - high}%`} height="14" />
              </g>
            </svg>
          </div>
          <div className="d2-2__legend">
            <p>
              <span className="d2-swatch d2-swatch--crop" aria-hidden="true" />
              <strong>{c.cost.crop.figure}</strong> {c.cost.crop.label}
            </p>
            <p>
              <span className="d2-swatch d2-swatch--spend" aria-hidden="true" />
              <strong>{c.cost.spend.figure}</strong> {c.cost.spend.label}
            </p>
          </div>
        </div>
        <p className="d2-footnote">{c.reframe}</p>
      </div>
    </D2Frame>
  );
}

function ValueSlide() {
  const c = d2Value;
  const { active } = useDeck();
  return (
    <D2Frame slide={c} index={2}>
      <div className="d2-body">
        <h2 className="d2-title d2-3__title">
          {c.headline} <span className="d2-quiet">{c.headlineSecond}</span>
        </h2>
        <D2Ruler copy={c.ruler} active={active === 2} />
        <div className="d2-3__cols">
          <div className="d2-3__col">
            <h3 className="d2-kicker">{c.evidenceHeading}</h3>
            <p className="d2-text">{c.evidence}</p>
            <p className="d2-text d2-3__gap">
              <RichText value={c.evidenceGap} />
            </p>
          </div>
          {assets.fieldTrials && (
            <figure className="d2-3__trials">
              <ZoomImage src={assets.fieldTrials} alt={c.trialsAlt} caption={c.trialsCaption} />
            </figure>
          )}
          <div className="d2-3__col d2-3__pivot">
            <h3 className="d2-kicker">{c.pivotHeading}</h3>
            <p className="d2-text">{c.pivot}</p>
          </div>
        </div>
      </div>
    </D2Frame>
  );
}

function SolutionSlide() {
  const c = d2Solution;
  const { active, openLightbox } = useDeck();
  return (
    <D2Frame slide={c} index={3}>
      <div className="d2-body">
        <h2 className="d2-title">{c.headline}</h2>
        <div className="d2-4__grid">
          <VideoPanel video={solutionSlide.video} active={active === 3} />
          <div className="d2-4__side">
            <Claim id={c.stepsClaim} block note={c.stepsNote}>
              <div className="d2-4__stats">
                {c.stats.map((s) => (
                  <Stat key={s.figure} stat={s} />
                ))}
              </div>
            </Claim>
            <p className="d2-4__founder">{c.founder}</p>
            <p className="d2-4__links">
              {assets.processFlow && (
                <button
                  type="button"
                  className="d2-link"
                  onClick={(e) =>
                    openLightbox(
                      { src: assets.processFlow!, alt: solutionSlide.processFlow.alt, caption: solutionSlide.processFlow.caption },
                      e.currentTarget,
                    )
                  }
                >
                  {c.links.process}
                </button>
              )}
              {assets.labResults && (
                <button
                  type="button"
                  className="d2-link"
                  onClick={(e) =>
                    openLightbox(
                      { src: assets.labResults!, alt: solutionSlide.lab.alt, caption: solutionSlide.lab.caption },
                      e.currentTarget,
                    )
                  }
                >
                  {c.links.lab}
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </D2Frame>
  );
}

function ModelSlide() {
  const c = d2Model;
  return (
    <D2Frame slide={c} index={4}>
      <div className="d2-body">
        <h2 className="d2-title">{c.headline}</h2>
        <div className="d2-5__stats">
          {c.stats.map((s) => (
            <Stat key={s.figure} stat={s} />
          ))}
        </div>
        <p className="d2-subhead d2-5__thesis">{c.thesis}</p>
        <p className="d2-text d2-5__next">
          <RichText value={c.next} />
        </p>
        <p className="d2-footnote d2-5__withdrawn">{c.withdrawn}</p>
      </div>
    </D2Frame>
  );
}
