import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { placeholders, type PlaceholderId } from "../content/placeholders";
import { useDeck } from "./DeckContext";
import { STAGE_H, STAGE_W } from "./Stage";

const CARD_W = 320;
const EDGE = 24;

type Props =
  | { kind: "evidence"; source: string; children?: ReactNode }
  | { kind: "placeholder"; id: PlaceholderId; children?: ReactNode };

/**
 * The [evidence: source] and [placeholder] marks from the Slides 6 to 10 brief.
 * Same behaviour as the assumption tag: a small label, and a card on hover or
 * keyboard focus saying where the evidence comes from, or what is missing.
 */
export function Tag(props: Props) {
  const { stageEl, scale, active } = useDeck();
  const cardId = useId();
  const tagRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number; above: boolean } | null>(null);

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
    const above = bottom + 130 > STAGE_H - 60;
    setPos({ x: Math.max(EDGE, Math.min(STAGE_W - EDGE - CARD_W, left - 12)), y: above ? top - 10 : bottom + 10, above });
  }, [open, scale, stageEl]);

  const card =
    props.kind === "evidence"
      ? { lead: "Source:", text: props.source }
      : { lead: "Missing:", text: `${placeholders[props.id].missing}. From: ${placeholders[props.id].from}.` };

  const stage = open ? stageEl() : null;

  return (
    <span
      className={`tagged tagged--${props.kind}`}
      tabIndex={0}
      aria-describedby={open ? cardId : undefined}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {props.children && <span className="tagged__text">{props.children} </span>}
      <span ref={tagRef} className={`claim__tag tag--${props.kind}`}>
        {props.kind}
      </span>
      {stage &&
        pos &&
        createPortal(
          <div
            id={cardId}
            role="tooltip"
            className={`claim-card${pos.above ? " claim-card--above" : ""}`}
            style={{ left: pos.x, top: pos.y, width: CARD_W }}
          >
            <span className="claim-card__lead">{card.lead}</span> {card.text}
          </div>,
          stage,
        )}
    </span>
  );
}
