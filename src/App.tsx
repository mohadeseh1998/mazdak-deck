import { DraftOne } from "./draft1/DraftOne";
import { DraftTwo } from "./draft2/DraftTwo";
import { DraftThree } from "./draft3/DraftThree";

/**
 * Draft 3 (keynote style) opens by default. Earlier drafts stay available:
 * ?draft=2 for the streamlined revision, ?draft=1 for the full brief,
 * for example http://localhost:5173/?draft=1#/3
 */
export function App() {
  const draft = new URLSearchParams(window.location.search).get("draft");
  if (draft === "1") return <DraftOne />;
  if (draft === "2") return <DraftTwo />;
  return <DraftThree />;
}
