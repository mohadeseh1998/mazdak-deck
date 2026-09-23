import { DraftOne } from "./draft1/DraftOne";
import { DraftTwo } from "./draft2/DraftTwo";

/**
 * Draft 2 (the streamlined revision) opens by default.
 * Draft 1 (the full brief) stays available at ?draft=1, for example
 * http://localhost:5173/?draft=1#/3
 */
export function App() {
  const draft = new URLSearchParams(window.location.search).get("draft");
  return draft === "1" ? <DraftOne /> : <DraftTwo />;
}
