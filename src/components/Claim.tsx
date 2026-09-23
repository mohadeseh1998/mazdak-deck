import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { claims, type ClaimId } from "../content/claims";
import { ui } from "../content/slides";
import type { SourceKey } from "../content/sources";
import { useDeck } from "./DeckContext";
import { STAGE_H, STAGE_W } from "./Stage";

const CARD_W = 320;
const EDGE = 24;
const FOOTER = 56;

type ClaimProps =
  | {
      kind?: "assumption";
      id: ClaimId;
      children: ReactNode;
      tagFirst?: boolean;
      /** Block form: tags a whole group once, with a visible note after the tag. */
      block?: boolean;
      note?: string;
      source?: never;
    }
  | {
      kind: "evidence";
      id?: string;
      children: ReactNode;
      source?: SourceKey;
      tagFirst?: never;
      block?: never;
      note?: never;
    };

/** The [assumption] tag and the proven mark (brief Section 6.1). */
export function Claim(props: ClaimProps) {
  if (props.kind === "evidence") {
    return (
      <span className="claim claim--evidence" data-source={props.source}>
        <span className="evidence-mark" aria-hidden="true" />
        {props.children}
      </span>
    );
  }
  return <Assumption {...props} />;
}

function Assumption({
  id,
  children,
  tagFirst,
  block,
  note,
}: {
  id: ClaimId;
  children: ReactNode;
  tagFirst?: boolean;
  block?: boolean;
  note?: string;
}) {
  const { stageEl, scale, active } = useDeck();
  const cardId = useId();
  const tagRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number; above: boolean } | null>(null);

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  // Close any open card when the slide changes.
  useEffect(() => setOpen(false), [active]);

  useLayoutEffect(() => {
    if (!open) return;
    const stage = stageEl();
    const tag = tagRef.current;
    if (!stage || !tag) return;
    const s = stage.getBoundingClientRect();
    const r = tag.getBoundingClientRect();
    const left = (r.left - s.left) / scale;
    const top = (r.top - s.top) / scale;
    const bottom = (r.bottom - s.top) / scale;
    const x = Math.max(EDGE, Math.min(STAGE_W - EDGE - CARD_W, left - 12));
    const below = bottom + 10;
    const above = below + 110 > STAGE_H - FOOTER;
    setPos({ x, y: above ? top - 10 : below, above });
  }, [open, scale, stageEl]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const tag = (
    <span ref={tagRef} className="claim__tag">
      {ui.assumptionTag}
    </span>
  );

  const stage = open ? stageEl() : null;
  const card =
    stage && pos
      ? createPortal(
          <div
            id={cardId}
            role="tooltip"
            className={`claim-card${pos.above ? " claim-card--above" : ""}`}
            style={{ left: pos.x, top: pos.y, width: CARD_W }}
          >
            <span className="claim-card__lead">{ui.proofLead}</span> {claims[id].proof}
          </div>,
          stage,
        )
      : null;

  const handlers = {
    tabIndex: 0,
    "aria-describedby": open ? cardId : undefined,
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    "data-claim": id,
  };

  if (block) {
    return (
      <div className="claim claim--assume claim--block" {...handlers}>
        <div className="claim__text">{children}</div>
        <p className="claim__note">
          {tag} {note}
        </p>
        {card}
      </div>
    );
  }

  return (
    <span className="claim claim--assume" {...handlers}>
      {tagFirst && <>{tag} </>}
      <span className="claim__text">{children}</span>
      {!tagFirst && <> {tag}</>}
      {card}
    </span>
  );
}
