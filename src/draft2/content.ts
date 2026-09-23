// Draft 2: the streamlined revision. One idea per slide; every talking point
// cut from a slide lives in its `detail` list, shown with the notes (key N).
// Figures are unchanged from the approved copy; only the wording is shorter.
import { CHELATE } from "../content/chemistry";
import type { ClaimId } from "../content/claims";
import { collectClaims, type Assumption, type Ground, type Rich } from "../content/slides";

const agent = CHELATE.agent;

const assume = (claim: ClaimId, text: Rich): Assumption => ({ claim, text });

export interface D2Slide {
  n: 1 | 2 | 3 | 4 | 5;
  title: string;
  ground: Ground;
  notes: string;
  detail: string[];
}

export interface Stat {
  figure: string;
  label: string;
  claim?: ClaimId;
  /** Present only so the audit counter sees a claim on a stat. */
  text?: string;
}

const stat = (figure: string, label: string, claim?: ClaimId): Stat =>
  claim ? { figure, label, claim, text: figure } : { figure, label };

/* ------------------------------------------------------------------ */

export const d2Title = {
  n: 1,
  title: "Title",
  ground: "ink",
  company: "Mazdak Atlantic AgriAqua",
  headline: "Iron that plants can actually absorb.",
  subhead: "Made in 20 minutes instead of 12 hours.",
  proof: [
    stat("65,222 mg/L", "Iron, independent SPECTRO assay"),
    stat("Nano", "Particle size confirmed by DLS"),
    stat("Gold Medal", "iCAN 2026, and two special awards"),
  ],
  honesty: "What we do not have yet: a Canadian trial, a Canadian customer, or CFIA registration.",
  imageAlt: "Three bottles of the liquid iron product, two amber and one dark brown.",
  notes:
    "If asked why pre-revenue matters less than it looks, point at the proof row. The chemistry is proven. The market is not.",
  detail: [
    "Mazdak Atlantic AgriAqua Inc. Incorporated in New Brunswick, GST and HST registered. Pre-revenue and self-funded.",
    "Mitacs Accelerate grant with UNB.",
    "Press A at any point to show every claim we have not proven yet.",
  ],
} satisfies D2Slide & Record<string, unknown>;

export const d2Problem = {
  n: 2,
  title: "Problem",
  ground: "glass",
  headline: "A yellow basket does not sell at any price.",
  subhead:
    "Bicarbonate-rich well water pushes greenhouse media above pH 6.0. The iron locks up, the leaves yellow, and the plant misses a ship date that cannot move.",
  cost: {
    total: stat("$0.8M to $2.0M", "Annual cost of the problem across NB, NS and PEI", "problem-cost"),
    crop: { figure: "85 to 90 percent", label: "lost or discounted crop" },
    spend: { figure: "$0.07M to $0.30M", label: "spent on iron products and water acidification" },
    cropShare: { low: 85, high: 90 },
  },
  reframe:
    "Atlantic Canadian field soils are naturally acidic. This problem lives in irrigation water and container media, not in the soil outside.",
  notes: "The agronomy question about acidic Atlantic soils is coming. The last line on the slide answers it.",
  detail: [
    "Calibrachoa and petunia need pH 5.4 to 6.0 (UC Nursery and Floriculture Alliance; Purdue HO-242-W).",
    "Assumption: most of the year's revenue arrives in the ten-week spring window.",
    "Growers today: sulfuric acid injection, or a corrective Fe-DTPA drench every three to four weeks (BASF Sprint label; UConn Extension).",
    "Assumption: smaller operations throw the yellow plants away.",
    "Only the small segment is money growers hand to a supplier. The large segment is the prize, and the number we are least sure of.",
    "The chlorosis share of greenhouse shrink is assumed at 10 to 25 percent and drives most of the range (AAFC 2023 sector base).",
  ],
} satisfies D2Slide & Record<string, unknown>;

export type RulerKind = "crop" | "standard" | "drift" | "claim";

export interface RulerRow {
  kind: RulerKind;
  /** The row label; for the claim row it is also the assumption's text. */
  text: string;
  range: string;
  from: number;
  to: number;
  claim?: ClaimId;
}

export const d2Value = {
  n: 3,
  title: "Value proposition",
  ground: "ink",
  headline: `Standard ${agent} quits at pH 6.5.`,
  headlineSecond: "That is where our customer's problem starts.",
  ruler: {
    title: `pH scale from 5.0 to 8.0 comparing standard Fe-${agent} with the claimed range`,
    desc: `The crop needs pH 5.4 to 6.0. Standard Fe-${agent} holds iron to about 6.5. The customer's media sits at 6.0 to 7.2. The company claims its product works from 6.0 to 8.0, which is unproven.`,
    gridProblem: "Problem starts",
    gridStandard: "Standard stops",
    rows: [
      { kind: "crop", text: "Crop needs", range: "pH 5.4 to 6.0", from: 5.4, to: 6.0 },
      { kind: "standard", text: `Standard Fe-${agent} works`, range: "pH 5.0 to about 6.5", from: 5.0, to: 6.5 },
      { kind: "drift", text: "Customer's media sits", range: "pH 6.0 to 7.2", from: 6.0, to: 7.2 },
      { kind: "claim", text: "We claim to still work", range: "pH 6.0 to 8.0", from: 6.0, to: 8.0, claim: "ph-extension" },
    ] satisfies RulerRow[],
  },
  evidenceHeading: "The evidence",
  evidence: "Root-zone field trials on four crops in Iran, on typically alkaline soils, showed improved plant health and greening.",
  evidenceGap: [assume("iran-ph", "Soil pH was not recorded at those sites.")] as Rich,
  pivotHeading: "The pivot",
  pivot: `If the first Canadian trial does not confirm it against recorded pH readings, we are a conventional Fe-${agent} competing on price. We would rather you heard that from us.`,
  trialsCaption: "Field trials, Iran. Pomegranate, olive, sweet corn and hybrid rose.",
  trialsAlt:
    "Four field trial photographs side by side: a pomegranate shrub, an olive tree, a bed of sweet corn seedlings and a hybrid rose bush.",
  notes: "Do not oversell. The pivot is the answer to 'what if you are wrong'. Read it aloud if the question comes.",
  detail: [
    `Our claim: the microwave and UV process produces an ${agent}-chelated nano iron that stays plant-available above the 6.5 line.`,
    "Root zone, not foliar, confirmed by Dr. Kalateh on 23 September 2026. Foliar iron greens a crop regardless of soil chemistry, so it would prove nothing about pH.",
    "Iranian agricultural soils are typically calcareous and alkaline, commonly pH 7.5 to 8.5 regionally.",
    `Assumption: the mechanism that extends ${agent}'s range is not characterised; it may relate to the nano fraction rather than chelate stability.`,
    "If the trial fails, the segment spends under $0.3M a year on iron and the target market gets rebuilt rather than refined.",
  ],
} satisfies D2Slide & Record<string, unknown>;

export const d2Solution = {
  n: 4,
  title: "Solution",
  ground: "glass",
  headline: "Twenty minutes, not twelve hours.",
  stats: [
    stat("20 min", "Microwave and UV chelation reaction"),
    stat("12+ hr", "Conventional high-pressure, high-temperature reactors"),
    stat("3 hr", "Full production cycle"),
  ],
  stepsClaim: "process-time" as ClaimId,
  stepsNote: "Verified in our own pilot production. Not yet reproduced in Canada.",
  founder: "Dr. Ali Kalateh, inorganic chemist. Career in industrial inorganic production lines, patents on related processes.",
  links: {
    process: "Process diagram",
    lab: "Lab assay",
  },
  notes:
    "If asked whether twenty minutes has been reproduced in Canada, the answer is no, and UNB plus the Mitacs grant is the route.",
  detail: [
    "Microwave and UV energy create localised hot spots inside the reaction vessel.",
    "Same chemistry, a fraction of the energy, a fraction of the plant footprint.",
    "65,222 mg/L iron: independent SPECTRO assay, 11 May 2023, two runs of 65,098.9 and 65,345.6 mg/L.",
    "Particle size in the nano range, confirmed by Dynamic Light Scattering.",
    "Assumption: less energy and a smaller plant is where the modelled CAD 10 per litre comes from. It has not survived a Canadian production run.",
  ],
} satisfies D2Slide & Record<string, unknown>;

export const d2Model = {
  n: 5,
  title: "Business model",
  ground: "ink",
  headline: "Sell the litre. Buy the reference.",
  stats: [
    stat("CAD 25", "per litre, sold direct", "price-25"),
    stat("CAD 10", "per litre, modelled production cost", "cost-10"),
    stat("12,000", "litres a year is about one hundred percent of current Maritime spend"),
  ],
  thesis:
    "The Maritimes is a proof market, not a revenue market. It buys two things we cannot buy anywhere else: Canadian references and a container application rate.",
  next: [
    "Where revenue scales: ",
    assume("ontario", "Ontario floriculture"),
    ", then ",
    assume("cannabis", "controlled-environment cannabis"),
    ".",
  ] as Rich,
  withdrawn:
    "Withdrawn this week, on our own initiative: the CAD 9.375M Year 3 revenue scenario, and the per-gram cost comparison with Sprint 330. Still open: CFIA registration is unpriced and unscheduled.",
  notes: "If asked why start in a market this small, the answer is references and an application rate, not revenue.",
  detail: [
    "Total cost of the problem is $0.8M to $2.0M, mostly lost crop. The segment's entire fertiliser bill, all nutrients, is $0.7M to $0.9M a year.",
    "Assumption: direct to growers first, then input dealers (Halifax Seed, Plant Products, Cavendish Agri Services).",
    "Assumption: the owner signs a trial alone; a purchase order also passes the dealer rep and our CFIA status.",
    "Ontario held about half of national floriculture production in 2022; national sales were $2.24 billion in 2024.",
    "NB cannabis farm cash receipts were $254.3M in 2024, roughly four times floriculture, nursery and sod combined. Iron-specific spend is not quantified.",
  ],
} satisfies D2Slide & Record<string, unknown>;

export const d2Slides = [d2Title, d2Problem, d2Value, d2Solution, d2Model] as const;

export const d2ClaimsPerSlide: number[] = d2Slides.map((s) => collectClaims(s).size);
export const d2ClaimsInDeck: number = collectClaims(d2Slides).size;
