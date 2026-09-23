import { modelSlide as copy } from "../content/slides";
import { sourceLine } from "../content/sources";
import { RichText } from "../components/RichText";
import { SlideFrame } from "../components/SlideFrame";

export function ModelSlide({ index }: { index: number }) {
  return (
    <SlideFrame slide={copy} index={index}>
      <h2 className="t-headline">{copy.headline}</h2>
      <div className="s5__cols">
        {copy.columns.map((col, i) => (
          <div key={col.heading} className={`s5__col s5__col--${i + 1}`}>
            <h3 className="s5__heading">{col.heading}</h3>
            {col.paragraphs.map((p, j) => (
              <p key={j} className="t-body">
                <RichText value={p} />
              </p>
            ))}
            {col.sources && <p className="t-caption">{sourceLine(col.sources)}</p>}
          </div>
        ))}
      </div>
      <p className="s5__withdrawn">{copy.withdrawn}</p>
    </SlideFrame>
  );
}
