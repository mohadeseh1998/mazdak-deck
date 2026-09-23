#!/usr/bin/env node
// Content guard (brief Sections 1, 10 and 11). Runs before every build and on
// every commit. Fails if:
//   - the em dash character appears in any tracked or staged file,
//   - the chelate is named in source outside src/content/chemistry.ts,
//   - DTPA appears other than as Fe-DTPA, the product growers currently buy,
//   - anything the data room withdrew or contradicted comes back.
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const EM_DASH = String.fromCharCode(0x2014);
const problems = [];

const files = execSync("git ls-files --cached --others --exclude-standard", { encoding: "utf8" })
  .split("\n")
  .filter(Boolean)
  .filter((f) => existsSync(f))
  .filter((f) => !/\.(png|jpe?g|webp|gif|mp4|ico|pdf|woff2?)$/i.test(f));

for (const file of files) {
  const text = readFileSync(file, "utf8");
  text.split("\n").forEach((line, i) => {
    if (line.includes(EM_DASH)) problems.push(`${file}:${i + 1}: em dash character`);
  });
}

const src = files.filter((f) => f.startsWith("src/"));

// Copy files where the slide 5 withdrawal sentence is allowed to name what was withdrawn.
const WITHDRAWAL_FILES = ["src/content/slides.ts", "src/draft2/content.ts"];
const inWithdrawal = (file, line) => WITHDRAWAL_FILES.includes(file) && line.includes("Withdrawn this week");

// Section 11 list. The two withdrawals on slide 5 are named there on purpose,
// so they are allowed in slides.ts inside that one sentence only.
const forbidden = [
  [/175\.4/, "USD 175.4M Canadian micronutrients market"],
  [/1\.3\s*B|1\.3 billion/i, "USD 1.3B North American market"],
  [/8 to 9 percent/i, "8 to 9 percent growth claim"],
  [/no competition/i, "\"No competition\""],
  [/grow and give|reforest/i, "Reforestation and Grow and Give commitment"],
  [/trusted by/i, "\"Trusted by\" strip"],
  [/25 percent cheaper/i, "25 percent cheaper than Sprint 330"],
  [/40 percent commercial crop|25 percent greenhouses/i, "Five-segment market allocation table"],
  [/alkaline (field )?soils? (in|of) (New Brunswick|Atlantic)/i, "Alkaline Atlantic soil claim"],
];

for (const file of src) {
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    const at = `${file}:${i + 1}`;
    for (const [re, label] of forbidden) if (re.test(line)) problems.push(`${at}: withdrawn content, ${label}`);
    if (/9\.375/.test(line) && !inWithdrawal(file, line))
      problems.push(`${at}: CAD 9.375M appears outside the withdrawal line`);
    if (/lower cost per gram|per-gram cost/i.test(line) && !inWithdrawal(file, line))
      problems.push(`${at}: cost-per-gram comparison appears outside the withdrawal line`);
    if (/\bEDTA\b/.test(line) && file !== "src/content/chemistry.ts")
      problems.push(`${at}: chelate named directly; use CHELATE.agent`);
    if (/DTPA/.test(line.replace(/Fe-DTPA/g, "")))
      problems.push(`${at}: DTPA outside "Fe-DTPA" (the product growers buy)`);
  });
}

if (problems.length) {
  console.error("Content check failed:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log(`Content check passed (${files.length} files).`);
