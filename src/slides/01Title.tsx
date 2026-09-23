import { assets } from "../content/assets";
import { titleSlide as copy } from "../content/slides";
import { Claim } from "../components/Claim";
import { AuditHint, SlideFrame } from "../components/SlideFrame";
import { Wordmark } from "../components/Wordmark";

export function TitleSlide({ index }: { index: number }) {
  const hasImage = !!assets.product;
  return (
    <SlideFrame slide={copy} index={index} footerText={copy.footer} className={hasImage ? "" : "slide--1-solo"}>
      <AuditHint className="s1__hint" />
      <div className="s1__text">
        <Wordmark ground={copy.ground} width={132} className="s1__logo" />
        <h1 className="t-deck-headline s1__headline">{copy.headline}</h1>
        <p className="s1__identity">{copy.identity}</p>
        <ul className="s1__evidence">
          {copy.evidence.map((e) => (
            <li key={e.text} className="t-label">
              <Claim kind="evidence" source={e.source}>
                {e.text}
              </Claim>
            </li>
          ))}
        </ul>
        <p className="s1__honesty">{copy.honesty}</p>
      </div>
      {hasImage && (
        <div className="s1__image">
          <img src={assets.product} alt={copy.imageAlt} />
        </div>
      )}
    </SlideFrame>
  );
}
