import type { ProblemSlide } from "../content/slides";
import { Claim } from "./Claim";

interface Props {
  cost: ProblemSlide["cost"];
}

/**
 * One horizontal stacked bar (brief Section 7.2). The lost-crop share is a
 * range, so the boundary between the two segments is drawn as a range too:
 * hatched to 85 percent, a dashed boundary zone to 90, solid iron after that.
 */
export function CostBar({ cost }: Props) {
  const { low, high } = cost.cropShare;
  const spendMid = (high + 100) / 2;
  return (
    <div className="costbar">
      <div className="costbar__total">
        <span className="t-figure">
          <Claim id={cost.total.claim!}>{cost.total.figure}</Claim>
        </span>
        <span className="t-label costbar__total-label">{cost.total.label}</span>
        <p className="t-caption costbar__footnote">{cost.footnote}</p>
      </div>

      <div className="costbar__viz">
        <div className="costbar__callouts">
          <div className="costbar__callout costbar__callout--crop">
            <span className="costbar__callout-figure">{cost.crop.figure}</span>
            <span className="t-label">{cost.crop.label}</span>
          </div>
          <div className="costbar__callout costbar__callout--spend">
            <span className="costbar__callout-figure">{cost.spend.figure}</span>
            <span className="t-label">{cost.spend.label}</span>
          </div>
        </div>
        <div className="costbar__leaders" aria-hidden="true">
          <span className="costbar__leader" style={{ left: 12 }} />
          <span className="costbar__leader" style={{ left: `${spendMid}%` }} />
        </div>

        <svg className="costbar__bar" width="100%" height="72" aria-hidden="true">
          <defs>
            <pattern id="cost-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" className="hatch-line hatch-line--cost" />
            </pattern>
          </defs>
          <rect className="costbar__crop-bg" x="0" y="0" width={`${high}%`} height="72" />
          <rect x="0" y="0" width={`${low}%`} height="72" fill="url(#cost-hatch)" />
          <rect className="costbar__zone" x={`${low}%`} y="0" width={`${high - low}%`} height="72" fill="url(#cost-hatch)" />
          <rect className="costbar__spend" x={`${high}%`} y="0" width={`${100 - high}%`} height="72" />
          <line className="costbar__boundary" x1={`${low}%`} x2={`${low}%`} y1="0" y2="72" />
          <line className="costbar__boundary" x1={`${high}%`} x2={`${high}%`} y1="0" y2="72" />
        </svg>

        <p className="costbar__insight">{cost.insight}</p>
      </div>
    </div>
  );
}
