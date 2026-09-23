import { SLIDE_COUNT, ui } from "../content/slides";

interface Props {
  note: string;
  n: number;
  /** Talking points cut from the slide, kept here so nothing is lost. */
  detail?: readonly string[];
}

/** Key N: the speaking note for the current slide, over the lower third. */
export function PresenterNotes({ note, n, detail }: Props) {
  return (
    <aside className={`notes${detail?.length ? " notes--detail" : ""}`} aria-label={ui.notesHeading}>
      <p className="notes__heading">
        {ui.notesHeading}, {ui.slideOf(n, SLIDE_COUNT).toLowerCase()}
      </p>
      <p className="notes__text">{note}</p>
      {detail && detail.length > 0 && (
        <ul className="notes__detail">
          {detail.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}
