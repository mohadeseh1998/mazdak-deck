import { Claim } from "../components/Claim";
import type { Stat as StatData } from "./content";

/** A large figure over a short label. A figure that is an assumption is tagged as a block. */
export function Stat({ stat, proven }: { stat: StatData; proven?: boolean }) {
  const body = (
    <>
      <span className="d2-stat__fig">{stat.figure}</span>
      <span className="d2-stat__label">
        {proven && <span className="d2-proof-dot" aria-hidden="true" />}
        {stat.label}
      </span>
    </>
  );
  if (stat.claim) {
    return (
      <div className="d2-stat">
        <Claim id={stat.claim} block>
          {body}
        </Claim>
      </div>
    );
  }
  return <div className="d2-stat">{body}</div>;
}
