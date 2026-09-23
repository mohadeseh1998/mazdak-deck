import { sources } from "../content/sources";
import { ui } from "../content/slides";

/** Key S: the source register, so "where is that from" has an instant answer. */
export function SourcesOverlay() {
  return (
    <aside className="sources" aria-label={ui.sourcesHeading}>
      <h2 className="sources__heading">{ui.sourcesHeading}</h2>
      <dl className="sources__list">
        {Object.entries(sources).map(([key, s]) => (
          <div key={key} className="sources__row">
            <dt>{key}</dt>
            <dd>{s.full}</dd>
          </div>
        ))}
      </dl>
      <p className="t-caption">{ui.sourcesHint}</p>
    </aside>
  );
}
