import { assets } from "../content/assets";
import { valueSlide as copy } from "../content/slides";
import { PhRuler } from "../components/PhRuler";
import { RichText } from "../components/RichText";
import { SlideFrame } from "../components/SlideFrame";
import { ZoomImage } from "../components/ZoomImage";
import { useDeck } from "../components/DeckContext";

export function ValueSlide({ index }: { index: number }) {
  const { active } = useDeck();
  const trials = assets.fieldTrials;
  return (
    <SlideFrame slide={copy} index={index}>
      <h2 className="t-headline s3__headline">{copy.headline}</h2>
      <PhRuler copy={copy.ruler} active={active === index} />
      <div className="s3__cols">
        <div className="s3__claim">
          <p className="t-body">
            <RichText value={copy.claim} />
          </p>
          {trials && (
            // BRIEF-QUESTION: Section 3 places this lower right, beside the pivot box;
            // Section 5 places it under the left column. Only the left column has room
            // for it under the approved copy, so this follows Section 5.
            <figure className="s3__trials">
              <ZoomImage src={trials} alt={copy.fieldTrials.alt} caption={copy.fieldTrials.caption} />
              <figcaption className="s3__trials-caption">{copy.fieldTrials.caption}</figcaption>
            </figure>
          )}
        </div>
        <div className="s3__evidence">
          <h3 className="s3__heading">{copy.evidenceHeading}</h3>
          {copy.evidence.map((p) => (
            <p key={p} className="t-body">
              {p}
            </p>
          ))}
        </div>
        <div className="s3__notheld">
          {copy.notHeld.map((p, i) => (
            <p key={i} className="t-body">
              <RichText value={p} />
            </p>
          ))}
        </div>
        <aside className="s3__pivot">
          {copy.pivot.map((p, i) => (
            <p key={p} className={i === 0 ? "s3__pivot-lead" : "t-body"}>
              <RichText value={p} />
            </p>
          ))}
        </aside>
      </div>
    </SlideFrame>
  );
}
