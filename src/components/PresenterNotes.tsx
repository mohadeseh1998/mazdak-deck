import { SLIDE_COUNT, ui } from "../content/slides";

/** Key N: the speaking note for the current slide, over the lower third. */
export function PresenterNotes({ note, n }: { note: string; n: number }) {
  return (
    <aside className="notes" aria-label={ui.notesHeading}>
      <p className="notes__heading">
        {ui.notesHeading}, {ui.slideOf(n, SLIDE_COUNT).toLowerCase()}
      </p>
      <p className="notes__text">{note}</p>
    </aside>
  );
}
