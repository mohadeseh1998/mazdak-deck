// ALL slide copy lives here, verbatim from the approved brief (Section 5).
// Components render these values; no copy is written inline in JSX.
import { CHELATE } from "./chemistry";
import type { ClaimId } from "./claims";
import { sources, type SourceKey } from "./sources";

const agent = CHELATE.agent;

/* ------------------------------------------------------------------ */
/* Inline rich text                                                    */
/* ------------------------------------------------------------------ */

export type Inline = string | Bold | Assumption;
export type Rich = string | Inline[];

export interface Bold {
  b: string;
}

/** Wraps the statement an [assumption] marker refers to. */
export interface Assumption {
  claim: ClaimId;
  text: Rich;
  /** The tag reads before the text, as in "[assumption] that this segment converts". */
  tagFirst?: boolean;
}

const b = (text: string): Bold => ({ b: text });
const assume = (claim: ClaimId, text: Rich, opts: { tagFirst?: boolean } = {}): Assumption => ({
  claim,
  text,
  ...opts,
});

/** A proven item: rendered with the vein square, never with a tag. */
export interface Evidence {
  text: string;
  source?: SourceKey;
}

/* ------------------------------------------------------------------ */
/* Slide shapes                                                        */
/* ------------------------------------------------------------------ */

export type Ground = "ink" | "glass";

export interface Slide {
  n: 1 | 2 | 3 | 4 | 5;
  /** Used in the footer rail, the landmark label and the live region. */
  title: string;
  ground: Ground;
  headline: string;
  /** Presenter note (key N): the likeliest hostile question. */
  notes: string;
}

export interface TitleSlide extends Slide {
  identity: string;
  evidence: Evidence[];
  honesty: string;
  footer: string;
  imageAlt: string;
}

export interface ResponseColumn {
  heading: string;
  body: Rich;
  proven: boolean;
  sources?: SourceKey[];
}

export interface CostFigure {
  figure: string;
  label: string;
  claim?: ClaimId;
}

export interface ProblemSlide extends Slide {
  lead: string;
  leadSources: SourceKey[];
  second: Rich;
  responsesLead: string;
  responses: ResponseColumn[];
  reframe: { paragraphs: string[]; sources: SourceKey[] };
  cost: {
    total: CostFigure;
    crop: CostFigure;
    spend: CostFigure;
    /** Range of the lost-crop share, used to draw the bar. */
    cropShare: { low: number; high: number };
    insight: string;
    footnote: string;
  };
  chlorosisAlt: string;
}

export interface ValueSlide extends Slide {
  ruler: {
    title: string;
    desc: string;
    crop: string;
    standard: string;
    drift: string;
    claimed: Assumption;
    gridStandard: string;
    gridProblem: string;
    /** Visually hidden text equivalent of the four bands. */
    textEquivalent: string[];
  };
  claim: Rich;
  evidenceHeading: string;
  evidence: string[];
  notHeld: Rich[];
  pivot: string[];
  fieldTrials: { caption: string; alt: string };
}

export interface ProcessStep {
  lead: string;
  rest: string;
}

export interface EvidenceFigure {
  figure: string;
  unit: string;
  label: string;
  source: SourceKey;
}

export interface SolutionSlide extends Slide {
  video: {
    youtubeId: string;
    watchUrl: string;
    embedUrl: string;
    sharepointUrl: string;
    sharepointLabel: string;
    caption: string;
    playLabel: string;
    escapeHint: string;
    iframeHint: string;
    fallback: string;
    fallbackLink: string;
    iframeTitle: string;
    posterAlt: string;
  };
  steps: ProcessStep[];
  stepsClaim: ClaimId;
  stepsNote: string;
  founder: string;
  processFlow: { alt: string; caption: string };
  lab: { alt: string; caption: string };
  evidence: EvidenceFigure[];
  costLine: Rich;
}

export interface ModelColumn {
  heading: string;
  paragraphs: Rich[];
  sources?: SourceKey[];
}

export interface ModelSlide extends Slide {
  columns: [ModelColumn, ModelColumn, ModelColumn];
  withdrawn: string;
}

/* ------------------------------------------------------------------ */
/* Slide 1, Title                                                      */
/* ------------------------------------------------------------------ */

export const titleSlide: TitleSlide = {
  n: 1,
  title: "Title",
  ground: "ink",
  headline: "Iron fertilizer plants can actually absorb, made in 20 minutes instead of 12 hours.",
  identity:
    "Mazdak Atlantic AgriAqua Inc. Incorporated in New Brunswick, GST and HST registered. Pre-revenue and self-funded.",
  evidence: [
    { text: "65,222 mg/L iron, independent SPECTRO assay", source: "spectro" },
    { text: "Nano particle size confirmed by DLS", source: "dls" },
    { text: "Gold Medal and two special awards, iCAN 2026" },
    { text: "Mitacs Accelerate grant with UNB" },
  ],
  honesty:
    "What we do not have yet: a Canadian trial, a Canadian customer, or CFIA registration. This deck tells you which claims are which.",
  footer: "Shadow Institute, Week 2, 23 September 2026.",
  imageAlt: "Three bottles of the liquid iron product, two amber and one dark brown, on a striped surface.",
  notes:
    "If asked why pre-revenue matters less than it looks, point at the evidence row. The chemistry is proven. The market is not.",
};

/* ------------------------------------------------------------------ */
/* Slide 2, Problem                                                    */
/* ------------------------------------------------------------------ */

export const problemSlide: ProblemSlide = {
  n: 2,
  title: "Problem",
  ground: "glass",
  headline: "A yellow basket does not sell at any price.",
  lead: "Independent Maritime greenhouses irrigate from bicarbonate-rich wells. Across a ten-week crop those bicarbonates push soilless media pH up past 6.0. Calibrachoa and petunia need 5.4 to 6.0. Above that band the iron in the pot locks up, leaves yellow between the veins, and the plant misses a ship date that cannot move.",
  leadSources: ["ucanr", "purdue"],
  second: [assume("spring-window", "Most of the year's revenue arrives in that ten-week spring window.")],
  responsesLead: "What growers do about it today",
  responses: [
    {
      heading: "Acid injection.",
      body: "Sulfuric acid metered into the irrigation line to strip bicarbonates before they reach the pot.",
      proven: true,
    },
    {
      heading: "Corrective drench.",
      body: "An iron chelate drench, typically Fe-DTPA, repeated every three to four weeks once chlorosis appears.",
      proven: true,
      sources: ["basf", "uconn"],
    },
    {
      heading: "Cull the crop.",
      body: [assume("culling", "Smaller operations throw the yellow plants away.")],
      proven: false,
    },
  ],
  reframe: {
    paragraphs: [
      "We are not claiming New Brunswick has alkaline farmland. Atlantic Canadian field soils are naturally acidic and are limed to raise pH, which makes iron more available outdoors, not less. The problem we sell into lives in soilless container media and in irrigation water chemistry, and it shows up regardless of the soil outside the greenhouse. We dropped the alkaline-soil framing in Week 2.",
    ],
    sources: ["gnbSoil"],
  },
  cost: {
    total: {
      figure: "$0.8M to $2.0M",
      label: "Total annual cost of the problem across NB, NS and PEI",
      claim: "problem-cost",
    },
    crop: { figure: "85 to 90 percent", label: "Of which crop lost or discounted, not product purchased" },
    spend: { figure: "$0.07M to $0.30M", label: "Out-of-pocket spend on iron products and water acidification" },
    cropShare: { low: 85, high: 90 },
    insight:
      "Only the small segment is money growers currently hand to a supplier. The large segment is the prize, and it is also the number we are least sure of.",
    footnote: `Sector base from ${sources.aafc2023.cite}. The share of greenhouse shrink caused by iron chlorosis has no free published source and is assumed at 10 to 25 percent. It drives most of this range.`,
  },
  chlorosisAlt: "Calibrachoa basket with leaves yellowing between green veins, the symptom of iron chlorosis.",
  notes:
    "The agronomy question about acidic Atlantic soils is coming. The reframe box answers it. Let them read it.",
};

/* ------------------------------------------------------------------ */
/* Slide 3, Value proposition                                          */
/* ------------------------------------------------------------------ */

export const valueSlide: ValueSlide = {
  n: 3,
  title: "Value proposition",
  ground: "ink",
  headline: `Standard ${agent} quits at pH 6.5. That is where our customer's problem starts.`,
  ruler: {
    title: `pH ruler from 5.0 to 8.0 comparing standard Fe-${agent} with the claimed range`,
    desc: `Four stacked bands. The crop needs pH 5.4 to 6.0. Standard Fe-${agent} holds iron from 5.0 to about 6.5. The customer's media has drifted to 6.0 to 7.2. The company claims its product still works from 6.0 to 8.0, which is unproven and fades out toward 8.0.`,
    crop: "Calibrachoa and petunia need this band.",
    standard: `Standard Fe-${agent} holds iron to roughly here.`,
    drift: "Where our customer's media actually sits.",
    claimed: assume("ph-extension", "Where we claim to still work,"),
    gridStandard: `Standard ${agent} stops working.`,
    gridProblem: "Problem starts.",
    textEquivalent: [
      "Band 1, proven: calibrachoa and petunia need pH 5.4 to 6.0.",
      `Band 2, proven: standard Fe-${agent} holds iron from pH 5.0 to roughly 6.5.`,
      "Band 3, the problem: the customer's media actually sits at pH 6.0 to 7.2.",
      "Band 4, unproven assumption: where we claim to still work, pH 6.0 to 8.0.",
    ],
  },
  claim: [
    "For a grower whose media has already drifted and whose baskets are already yellowing, the cheapest chelate on the shelf is out of range before it goes in the tank. ",
    assume(
      "ph-extension",
      `Our claim is that the microwave and UV process produces an ${agent}-chelated nano iron that stays plant-available above that line.`,
    ),
  ],
  evidenceHeading: "The evidence behind the claim",
  evidence: [
    "Field trials on four crops in Iran, where agricultural soils are typically calcareous and alkaline, commonly pH 7.5 to 8.5 regionally. Pomegranate, olive, sweet corn and hybrid rose. Results showed improved plant health and greening.",
    "The iron was applied to the root zone, not as a foliar spray, confirmed by Dr. Kalateh on 23 September 2026. This matters: foliar iron greens a crop regardless of soil chemistry, so a foliar result would have proved nothing about pH. Root-zone application means the iron had to stay plant-available through the soil solution, which is the same pathway as the Canadian container case.",
  ],
  notHeld: [
    [assume("iran-ph", "Exact soil pH values were not recorded at the Iranian sites.")],
    [
      assume(
        "mechanism",
        `The mechanism that extends ${agent}'s effective pH range is not characterised, and may relate to the nano particle fraction rather than to chelate stability.`,
      ),
    ],
  ],
  pivot: [
    "This is a pivot point, not a data point.",
    `If the first Canadian trial does not confirm extended-pH performance against actual recorded readings, we are a conventional Fe-${agent} competing on price in a segment that spends under $0.3M a year on iron, and the target market gets rebuilt rather than refined.`,
    "We would rather you heard that from us than found it in diligence.",
  ],
  fieldTrials: {
    caption: "Field trials, Iran. Four crops, root-zone application.",
    alt: "Four field trial photographs side by side: a pomegranate shrub, an olive tree, a bed of sweet corn seedlings and a hybrid rose bush with striped red flowers.",
  },
  notes:
    "Do not oversell. The pivot box is the answer to 'what if you are wrong'. Read it aloud if the question comes.",
};

/* ------------------------------------------------------------------ */
/* Slide 4, Solution and the underlying magic                          */
/* ------------------------------------------------------------------ */

const YOUTUBE_ID = "0NdO6-vzsBk";

export const solutionSlide: SolutionSlide = {
  n: 4,
  title: "Solution",
  ground: "glass",
  headline: "Twenty minutes, not twelve hours.",
  video: {
    youtubeId: YOUTUBE_ID,
    watchUrl: `https://youtu.be/${YOUTUBE_ID}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1&playsinline=1`,
    sharepointUrl:
      "https://unbcloud-my.sharepoint.com/:v:/g/personal/n57c3_unb_ca/EQlMFar4VB1InDeav-jjdisBoTNK7C-VbgA8pfuoWe0WKQ",
    sharepointLabel: "Alternative source, UNB SharePoint, sign-in required.",
    // BRIEF-QUESTION: duration is a placeholder until the real runtime is known (Section 7.3).
    caption: "Product and process demonstration. Two minutes.",
    playLabel: "Play the product and process demonstration",
    escapeHint: "Press Escape to return to slide controls.",
    // BRIEF-QUESTION: keystrokes inside a cross-origin YouTube iframe never reach
    // this page, so Escape cannot be caught while the player itself has focus.
    // The hint is truthful for that case instead.
    iframeHint: "Click outside the video to return to slide controls.",
    fallback: "The video could not load here.",
    fallbackLink: `Watch on YouTube, youtu.be/${YOUTUBE_ID}`,
    iframeTitle: "Product and process demonstration video",
    posterAlt: "Three bottles of the liquid iron product, two amber and one dark brown.",
  },
  steps: [
    { lead: "Microwave and UV energy create localised hot spots", rest: " inside the reaction vessel." },
    {
      lead: "The chelation reaction runs to completion in about twenty minutes,",
      rest: " against twelve hours or more in conventional high-pressure, high-temperature reactors.",
    },
    {
      lead: "A full production cycle takes roughly three hours.",
      rest: " Same chemistry, a fraction of the energy, a fraction of the plant footprint.",
    },
  ],
  stepsClaim: "process-time",
  stepsNote: "Verified in our own pilot production. Not yet reproduced in Canada.",
  founder:
    "Dr. Ali Kalateh, inorganic chemist, career in industrial inorganic production lines, patents on related processes.",
  processFlow: {
    alt: "Process flow diagram. Chelating agent and iron pre-treatment feed reduction, oxidation and pH adjustment, then a mixing tank, two parallel microwave and UV reactor lines, a filter, and packaging and storage.",
    caption: "Production process flow.",
  },
  lab: {
    alt: "Company summary slide with three DLS particle size dispersion charts and a SPECTRO assay report for sample MR KALATE with its two concentration runs highlighted.",
    caption: "SPECTRO elemental assay, sample MR KALATE, 11 May 2023. Two runs: 65,098.9 and 65,345.6 mg/L.",
  },
  evidence: [
    {
      figure: "65,222 mg/L",
      unit: "iron concentration",
      label: "Independent SPECTRO elemental assay, 11 May 2023. Two runs, 65,098.9 and 65,345.6 mg/L.",
      source: "spectro",
    },
    {
      figure: "Nano range",
      unit: "particle size",
      label: "Confirmed by Dynamic Light Scattering, size dispersion by intensity, volume and number.",
      source: "dls",
    },
  ],
  costLine: [
    assume(
      "cost-10",
      "Less energy and a smaller plant is where the modelled production cost of CAD 10 per litre comes from. That figure has not survived a Canadian production run.",
    ),
  ],
  notes:
    "If asked whether twenty minutes has been reproduced in Canada, the answer is no, and UNB plus the Mitacs grant is the route.",
};

/* ------------------------------------------------------------------ */
/* Slide 5, Business model                                             */
/* ------------------------------------------------------------------ */

export const modelSlide: ModelSlide = {
  n: 5,
  title: "Business model",
  ground: "ink",
  headline: "Sell the litre. Buy the reference.",
  columns: [
    {
      // BRIEF-QUESTION: column one has no heading in the approved copy; this reuses
      // the brief's own description of the column so the three columns align.
      heading: "How we make money",
      paragraphs: [
        [assume("price-25", [b("CAD 25 per litre"), " of concentrate, sold direct."])],
        [assume("cost-10", [b("CAD 10 per litre"), " modelled production cost."])],
        [
          assume(
            "channel",
            "Direct to growers first, then through input dealers: Halifax Seed, Plant Products, Cavendish Agri Services.",
          ),
        ],
        [
          assume(
            "channel",
            "The owner signs a trial alone, often on the same call. A purchase order passes two further gates: the grower's existing input dealer rep, and our CFIA registration status.",
          ),
        ],
      ],
    },
    {
      heading: "What this market can actually pay us",
      paragraphs: [
        [
          "Total annual cost of the problem across the Maritime segment is ",
          b("$0.8M to $2.0M"),
          ", and 85 to 90 percent of that is lost crop rather than purchased product. The hard ceiling is tighter: the segment's entire fertiliser bill, all nutrients combined, is ",
          b("$0.7M to $0.9M"),
          " a year, and any iron revenue here comes out of that pool.",
        ],
        ["At CAD 25 per litre, capturing one hundred percent of current spend is about ", b("12,000 litres a year"), "."],
        [
          "So the Maritimes is a proof market, not a revenue market. It is cheap to reach, fast to trial, and it is where we buy two things we cannot buy anywhere else: Canadian references and a container application rate.",
        ],
      ],
    },
    {
      heading: "Where the revenue is",
      paragraphs: [
        [
          b("Ontario."),
          " About half of national floriculture production sat in Ontario in 2022. National floriculture sales were $2.24 billion in 2024. ",
          assume("ontario", "that this segment converts on the same proposition.", { tagFirst: true }),
        ],
        [
          b("Controlled-environment cannabis."),
          " New Brunswick cannabis farm cash receipts were $254.3M in 2024, roughly four times floriculture, nursery and sod combined. High irrigation-water alkalinity raises substrate pH in container cannabis and iron deficiency is the primary resulting problem, more acute in small root volumes and long cycles. ",
          assume("cannabis", "Iron-specific spend in that segment is not quantified."),
        ],
      ],
      sources: ["aafc2024", "gnbReceipts", "cbt"],
    },
  ],
  withdrawn:
    "Withdrawn this week, on our own initiative: the CAD 9.375M Year 3 revenue scenario, and the claim of roughly 25 percent lower cost per gram of iron than Sprint 330, which compared across chelate classes and was not like for like. Still open: CFIA registration remains unpriced and unscheduled, and it moves ahead of first production in the plan.",
  notes:
    "If asked why start in a market this small, the answer is references and an application rate, not revenue.",
};

export const slides = [titleSlide, problemSlide, valueSlide, solutionSlide, modelSlide] as const;
export const SLIDE_COUNT = slides.length;

/* ------------------------------------------------------------------ */
/* Interface strings                                                   */
/* ------------------------------------------------------------------ */

export const ui = {
  deckLabel: "Mazdak Atlantic AgriAqua investor deck",
  companyName: "Mazdak Atlantic AgriAqua",
  logoAlt: "Mazdak Atlantic AgriAqua",
  auditHint: { before: "Press", key: "A", after: "to highlight every unproven claim in the deck." },
  assumptionTag: "assumption",
  proofLead: "How this gets proven:",
  notesHeading: "Presenter note",
  sourcesHeading: "Source register",
  sourcesHint: "Press S or Escape to close.",
  close: "Close",
  prev: "Previous slide",
  next: "Next slide",
  slideOf: (n: number, total: number) => `Slide ${n} of ${total}`,
  goTo: (n: number, title: string) => `Go to slide ${n}, ${title}`,
  openImage: (caption: string) => `Open image full size: ${caption}`,
  auditCount: (onSlide: number, inDeck: number) =>
    `${onSlide} unproven ${onSlide === 1 ? "claim" : "claims"} on this slide, ${inDeck} in the deck.`,
  announce: (n: number, total: number, title: string) => `Slide ${n} of ${total}, ${title}`,
};

/* ------------------------------------------------------------------ */
/* Claim counting for audit mode                                       */
/* ------------------------------------------------------------------ */

/** Walks any content value and collects the ids of every assumption in it. */
export function collectClaims(value: unknown, into: Set<ClaimId> = new Set()): Set<ClaimId> {
  if (Array.isArray(value)) {
    value.forEach((v) => collectClaims(v, into));
  } else if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (typeof obj.claim === "string" && ("text" in obj || "figure" in obj)) into.add(obj.claim as ClaimId);
    if (typeof obj.stepsClaim === "string") into.add(obj.stepsClaim as ClaimId);
    Object.values(obj).forEach((v) => collectClaims(v, into));
  }
  return into;
}

export const claimsPerSlide: number[] = slides.map((s) => collectClaims(s, new Set()).size);
export const claimsInDeck: number = collectClaims(slides, new Set()).size;
