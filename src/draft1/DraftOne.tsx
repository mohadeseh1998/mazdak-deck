import { DeckShell } from "../components/DeckShell";
import { claimsInDeck, claimsPerSlide, slides } from "../content/slides";
import { TitleSlide } from "../slides/01Title";
import { ProblemSlide } from "../slides/02Problem";
import { ValueSlide } from "../slides/03Value";
import { SolutionSlide } from "../slides/04Solution";
import { ModelSlide } from "../slides/05Model";

/** Draft 1: the full brief, built as specified. Open with ?draft=1. */
export function DraftOne() {
  return (
    <DeckShell slides={slides} claimsPerSlide={claimsPerSlide} claimsInDeck={claimsInDeck} className="d1">
      <TitleSlide index={0} />
      <ProblemSlide index={1} />
      <ValueSlide index={2} />
      <SolutionSlide index={3} />
      <ModelSlide index={4} />
    </DeckShell>
  );
}
