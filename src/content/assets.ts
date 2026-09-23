// Build-time glob over the client's `assets/` folder (brief Section 3).
// Vite resolves this when it bundles, so a file dropped into assets/ later
// (problem-chlorosis.jpg, demo.mp4) is picked up by the next build, and in dev
// the page reloads on its own. A missing file is simply absent from the map,
// so every slot degrades without a runtime 404.
//
// BRIEF-QUESTION: the brief asks for copies in public/assets referenced as
// "/assets/<name>". A root-absolute path breaks the `base: './'` requirement
// (subpath hosting, USB stick), and a copy can drift from the client's folder.
// Globbing the client's folder directly keeps one source of truth and emits
// relative URLs that work from any location.
const found = import.meta.glob("../../assets/*.{png,jpg,jpeg,webp,mp4}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

// Case-insensitive lookup: the client's logo arrives as "Logo.png".
const byName = new Map<string, string>(
  Object.entries(found).map(([path, url]) => [path.split("/").pop()!.toLowerCase(), url]),
);

const pick = (name: string): string | undefined => byName.get(name.toLowerCase());

export const assets = {
  logo: pick("logo.png"),
  product: pick("product.jpg"),
  fieldTrials: pick("field-trials.jpg"),
  processFlow: pick("process-flow.jpg"),
  labResults: pick("lab-results.jpg"),
  problemChlorosis: pick("problem-chlorosis.jpg"),
  demoVideo: pick("demo.mp4"),
};
