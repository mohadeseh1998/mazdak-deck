import { assets } from "../content/assets";
import { problemSlide as copy } from "../content/slides";
import { sourceLine } from "../content/sources";
import { Claim } from "../components/Claim";
import { CostBar } from "../components/CostBar";
import { RichText } from "../components/RichText";
import { SlideFrame } from "../components/SlideFrame";

export function ProblemSlide({ index }: { index: number }) {
  // problem-chlorosis.jpg is picked up by the build-time glob when the client adds it.
  const photo = assets.problemChlorosis;
  return (
    <SlideFrame slide={copy} index={index} className={photo ? "s2--photo" : "s2--no-photo"}>
      <div className="s2__main">
        <h2 className="t-headline">{copy.headline}</h2>
        <div className="s2__grid">
          <div className="s2__story">
            <p className="t-lead">{copy.lead}</p>
            <p className="t-caption s2__source">{sourceLine(copy.leadSources)}</p>
            <p className="t-body s2__second">
              <RichText value={copy.second} />
            </p>
            <h3 className="s2__responses-lead">{copy.responsesLead}</h3>
            <div className="s2__responses">
              {copy.responses.map((r) => (
                <div key={r.heading} className="s2__response">
                  <h4 className="s2__response-heading">
                    {r.proven ? <Claim kind="evidence">{r.heading}</Claim> : r.heading}
                  </h4>
                  <p className="s2__response-body">
                    <RichText value={r.body} />
                  </p>
                  {r.sources && <p className="t-caption">{sourceLine(r.sources)}</p>}
                </div>
              ))}
            </div>
          </div>
          <aside className="s2__reframe">
            {copy.reframe.paragraphs.map((p) => (
              <p key={p} className="s2__reframe-text">
                {p}
              </p>
            ))}
            <p className="t-caption">{sourceLine(copy.reframe.sources)}</p>
          </aside>
        </div>
        {/* Without the photo, the cost bar runs the full width, into the space the photo would take. */}
        <CostBar cost={copy.cost} />
      </div>
      {photo && (
        <div className="s2__photo">
          <img src={photo} alt={copy.chlorosisAlt} />
        </div>
      )}
    </SlideFrame>
  );
}
