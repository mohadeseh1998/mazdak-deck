import { assetNamed } from "../content/assets";
import { build, Frame } from "./Frame";
import { d3Recognition, type RecognitionImage } from "./content11";
import "./draft3-11.css";

/**
 * One recognition image. Images live in assets/recognition_images/. Until a
 * file is added, a quiet frame holds its place so the layout never shifts.
 */
function Shot({ image, className = "" }: { image: RecognitionImage; className?: string }) {
  const src = assetNamed(image.file);
  return (
    <div className={`d3-shot ${className}${src ? "" : " d3-shot--missing"}`}>
      {src ? (
        <img src={src} alt={image.alt} style={image.top ? { objectPosition: "center top" } : undefined} />
      ) : (
        <span className="d3-shot__missing">{image.file}</span>
      )}
    </div>
  );
}

/** Slide 11: recognition, one tall card and a two-by-two grid. */
export function Slide11() {
  const c = d3Recognition;
  return (
    <Frame slide={c} index={10}>
      <div className="d3-page">
        <h2 className="d3-page__title d3-in" style={build(0)}>
          {c.headline}
        </h2>
        <div className="d3-awards">
          <article className="d3-award d3-award--tall d3-in" style={build(1)}>
            <div className="d3-award__medals">
              {c.ican.medals.map((m) => (
                <Shot key={m.file} image={m} />
              ))}
              {c.ican.medals.map((m) => (
                <span key={m.file} className="d3-award__caption">
                  {m.caption}
                </span>
              ))}
            </div>
            <div className="d3-award__thumbs">
              {c.ican.thumbs.map((t) => (
                <Shot key={t.file} image={t} />
              ))}
            </div>
            <h3 className="d3-award__heading">{c.ican.heading}</h3>
            <p className="d3-award__text">{c.ican.description}</p>
          </article>
          <div className="d3-awards__grid">
            {c.cards.map((card, i) => (
              <article
                key={card.heading}
                className={`d3-award d3-in${card.images.length ? "" : " d3-award--text"}`}
                style={build(2 + i)}
              >
                {card.images.length > 0 && (
                  <div className={`d3-award__images d3-award__images--${card.images.length}`}>
                    {card.images.map((im) => (
                      <Shot key={im.file} image={im} />
                    ))}
                  </div>
                )}
                <h3 className="d3-award__heading">{card.heading}</h3>
                <p className="d3-award__text">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
