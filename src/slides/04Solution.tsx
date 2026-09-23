import { assets } from "../content/assets";
import { solutionSlide as copy } from "../content/slides";
import { Claim } from "../components/Claim";
import { RichText } from "../components/RichText";
import { SlideFrame } from "../components/SlideFrame";
import { VideoPanel } from "../components/VideoPanel";
import { ZoomImage } from "../components/ZoomImage";
import { useDeck } from "../components/DeckContext";

export function SolutionSlide({ index }: { index: number }) {
  const { active } = useDeck();
  return (
    <SlideFrame slide={copy} index={index}>
      <h2 className="t-headline">{copy.headline}</h2>
      <div className="s4__grid">
        <VideoPanel video={copy.video} active={active === index} />
        <div className="s4__rail">
          <Claim id={copy.stepsClaim} block note={copy.stepsNote}>
            <ol className="s4__steps">
              {copy.steps.map((s, i) => (
                <li key={s.lead} className="s4__step">
                  <span className="s4__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <p className="s4__step-text">
                    <strong>{s.lead}</strong>
                    {s.rest}
                  </p>
                </li>
              ))}
            </ol>
          </Claim>
          {assets.processFlow && (
            <div className="s4__flow">
              <ZoomImage src={assets.processFlow} alt={copy.processFlow.alt} caption={copy.processFlow.caption} />
            </div>
          )}
          <p className="s4__founder">{copy.founder}</p>
        </div>
      </div>
      <div className={`s4__strip${assets.labResults ? "" : " s4__strip--no-thumb"}`}>
        {assets.labResults && (
          <ZoomImage className="s4__thumb" src={assets.labResults} alt={copy.lab.alt} caption={copy.lab.caption} />
        )}
        {copy.evidence.map((e) => (
          <div key={e.figure} className="s4__figure">
            <span className="t-figure">
              <Claim kind="evidence" source={e.source}>
                {e.figure}
              </Claim>
            </span>
            <span className="s4__unit">{e.unit}</span>
            <span className="t-caption s4__figure-label">{e.label}</span>
          </div>
        ))}
        <p className="s4__cost">
          <RichText value={copy.costLine} />
        </p>
      </div>
    </SlideFrame>
  );
}
